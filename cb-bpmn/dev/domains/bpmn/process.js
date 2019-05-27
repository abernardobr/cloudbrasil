/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var util = require('util');
var async = require('async');
var _ = require('lodash');

var _s = require('underscore.string');
var definitions = require('./parsing/definitions.js');
var handler = require('./handler.js');
var log = require('./logger.js');

var transactionLog = null;
try {
    transactionLog = require('e2e-transaction-logger');
}catch(err){
    transactionLog = null;
}

var getTimestamp = Date.now;

var EventEmitter = require('events').EventEmitter;
var BPMNProcessState = require("./state.js").BPMNProcessState;
var BPMNProcessHistory = require("./history.js").BPMNProcessHistory;
var BPMNProcessClient = require("./client.js").BPMNProcessClient;
var BPMNPendingTimerEvents = require("./timeouts.js").BPMNPendingTimerEvents;

var activityEndHandlerPostfix = require('./parsing/activity.js').activityEndHandlerPostfix;

var TOKEN_ARRIVED_EVENT = "TOKEN_ARRIVED_EVENT";
var ACTIVITY_END_EVENT = "ACTIVITY_END_EVENT";
var INTERMEDIATE_CATCH_EVENT = "INTERMEDIATE_CATCH_EVENT";
var BOUNDARY_CATCH_EVENT = "BOUNDARY_CATCH_EVENT";

/**
 * Internal creation. The process is created and try to load persisted data.
 * @param {String} id
 * @param {BPMNProcessDefinition} processDefinition
 * @param {Object} eventHandler This object should contain event handler for all BPMN events
 * @param {Persistency=} persistency
 * @param {BPMNProcess=} parentProcess
 * @param {Token=} parentToken
 * @param {HistoryEntry=} parentHistoryEntry
 * @param {manager=} the process manager
 * @param {Function=} callback
 * @return {BPMNProcess}
 */
var createBPMNProcess = exports.createBPMNProcess = function(options, callback) {
    var bpmnProcess;
    var id = options.id;
    var processDefinition = options.processDefinition || null;
    var eventHandler = options.eventHandler || null;
    var persistency = options.persistency || null;
    var parentProcess = options.parentProcess || null;
    var parentToken = options.parentToken || null;
    var parentHistoryEntry = options.parentHistoryEntry || null;
    var manager = options.manager || null;

    if(!callback){
        return;
    }

    var options = {
        id,
        processDefinition,
        eventHandler,
        persistency,
        parentProcess,
        parentToken,
        parentHistoryEntry,
        manager
    };
    bpmnProcess = new BPMNProcess(options);

    if (bpmnProcess.isMainProcess()) {
        // we save all process information - including called processes - in one document
        bpmnProcess.loadPersistedData(function(err){
            if(callback){
                callback(err, bpmnProcess);
            }
        });
    } else {
        if(callback){
            process.nextTick(function(){        // to stay consistent
                callback(null, bpmnProcess);
            });
        }
    }
};

/**
 * @param {String} id
 * @param {BPMNProcessDefinition} processDefinition
 * @param {Object} eventHandler This object should contain event handler for all BPMN events
 * @param {Persistency=} persistency
 * @param {BPMNProcess=} parentProcess
 * @param {Token=} parentToken
 * @param {HistoryEntry=} parentHistoryEntry
 * @param {BPMNManager=} manager
 * @constructor
 */
function BPMNProcess(options) {
    var self = this;
    var defaultEventHandler, defaultErrorHandler;
    var parentToken = options.parentToken;
    var parentHistoryEntry = options.parentHistoryEntry;

    self.processId = options.id;
    self.manager = options.manager;
    self.processDefinition = options.processDefinition;
    self.eventHandler = options.eventHandler || {};
    self.parentProcess = options.parentProcess;
    self.pendingTimerEvents = new BPMNPendingTimerEvents(this);
    self.persistency = options.persistency;
    self.deferredEvents = [];
    self.deferEvents = false; // events must be deferred if the process engine is loading or saving state
    self.processClient = new BPMNProcessClient(this);
    self.participants = {}; // if the process takes part in a collaboration, we store all participant process in this map
    self.properties = {}; // TODO: how do we handle parent data?
    self.calledProcesses = {};
    self.logger = new log.Logger(self, {logLevel: log.logLevels.trace});
    if(transactionLog) {
        self.transactionLogger = new transactionLog.TransactionLogger();
    }
    self.currentTrx = null;
    self.views = {
        startEvent : null,
        endEvent : null,
        duration : null
    };

    if (parentToken) {
        self.state = new BPMNProcessState(parentToken.substate);
        parentToken.substate = this.state;
        self.parentToken = parentToken;
    } else {
        self.state = new BPMNProcessState();
    }

    if (parentHistoryEntry) {
        self.history = new BPMNProcessHistory(parentHistoryEntry.subhistory);
        parentHistoryEntry.subhistory = this.history;
    } else {
        self.history = new BPMNProcessHistory();
    }

    defaultErrorHandler = logDefaultedErrors;
    defaultEventHandler = function(eventType, currentFlowObjectName, handlerName, reason, done, data) {
        if (done) {
            done.call(self.processClient);
        }
    };

    self.defaultEventHandler = self.eventHandler.defaultEventHandler || defaultEventHandler;
    self.defaultErrorHandler = self.eventHandler.defaultErrorHandler || defaultErrorHandler;
    self.doneSavingHandler = self.eventHandler.doneSavingHandler;
    self.doneLoadingHandler = self.eventHandler.doneLoadingHandler;
    self.onBeginHandler = self.eventHandler.onBeginHandler;
    self.onEndHandler = self.eventHandler.onEndHandler;

    self._registerOnTokenArrivedEvent();
    self._registerActivityEndEvents();
    self._registerThrowIntermediateEvents();
    self._registerThrowBoundaryEvents();
}
util.inherits(BPMNProcess, EventEmitter);

/**
 * @returns {Boolean}
 */
BPMNProcess.prototype.restart = function() {
    var self = this;
    self.history.reset();
};

/**
 * @returns {Boolean}
 */
BPMNProcess.prototype.isMainProcess = function() {
    return  (this.parentProcess === undefined || this.parentProcess === null);
};

/**
 * @returns {BPMNProcessDefinition}
 */
BPMNProcess.prototype.getProcessDefinition = function() {
    return this.processDefinition;
};

/**
 * @returns {String}
 */
BPMNProcess.prototype.getProcessId = function() {
    return this.processId;
};

/**
 * @param {Logger} logger
 */
BPMNProcess.prototype.setLogger = function(logger) {
    this.logger = logger;
};

/**
 * @param {number | string} logLevel
 */
BPMNProcess.prototype.setLogLevel = function(logLevel) {
    this.logger.setLogLevel(logLevel);
};

/**
 * @param {function(string)} logAppender
 */
BPMNProcess.prototype.setLogAppender = function(logAppender) {
    this.logger.logAppender = logAppender;
};

/**
 * Add winston log transport (semantic like winston add() [https://github.com/flatiron/winston])
 * @param winstonTransport
 * @param options
 */
BPMNProcess.prototype.addLogTransport = function(winstonTransport, options) {
    this.logger.addTransport(winstonTransport, options);
};

/**
 * Remove winston log transport (semantic like winston remove() [https://github.com/flatiron/winston])
 * @param winstonTransport
 */
BPMNProcess.prototype.removeLogTransport = function(winstonTransport) {
    this.logger.removeTransport(winstonTransport);
};

/**
 * @returns {Transaction}
 */
BPMNProcess.prototype.getCurrentTrx = function() {
    return this.currentTrx;
};

/**
 * @param {String} eventName
 * @param {Object=} data
 */
BPMNProcess.prototype.triggerEvent = function(eventName, data) {
    var self = this;
    var processDefinition = self.processDefinition;
    var flowObjectName = eventName;
    var flowObject = processDefinition.getFlowObjectByName(flowObjectName);
    var taskDoneMatch = _s.endsWith(eventName, activityEndHandlerPostfix);

    if (flowObject) {

        this.logger.trace("Trigger " + flowObject.type + " '" + flowObject.name + "'", data);

        if (flowObject.isStartEvent) {
            if (self.history.hasBeenVisited(eventName)) {
                throw new Error("The start event '" + eventName + "' cannot start an already started process.");
            } else {
                // start events create a token and put it on the first occurrence
                self._putTokenAt(flowObject, data);
            }
        } else if (flowObject.isIntermediateCatchEvent) {
            process.nextTick(function() {
                // We need this to achieve parallel collaborating processes
                // TODO: however, it is not completely clear to me whether this works in all circumstances
                self._emitEvent(INTERMEDIATE_CATCH_EVENT, eventName, data);
            });
        } else if (flowObject.isBoundaryEvent) {
            self._emitEvent(BOUNDARY_CATCH_EVENT, eventName, data);
        } else {
            throw new Error("The process '" + processDefinition.name + "' has no intermediate catch event for '" + eventName + "'");
        }
    } else if (taskDoneMatch){
        flowObjectName = _s.strLeft(eventName, activityEndHandlerPostfix);
        flowObject = processDefinition.getFlowObjectByName(flowObjectName);

        if(flowObject && flowObject.isWaitTask){
            self.taskDone(flowObjectName, data);
        }else{
            throw new Error("The process '" + processDefinition.name + "' does not know the event '" + eventName + "'");
        }
    } else {
        throw new Error("The process '" + processDefinition.name + "' does not know the event '" + eventName + "'");
    }
};

/**
 * @param {String} eventName
 * @param {Object=} data
 */
BPMNProcess.prototype.triggerRestartEvent = function(eventName, data) {
    var self = this;
    var processDefinition = self.processDefinition;
    var flowObjectName = eventName;
    var flowObject = processDefinition.getFlowObjectByName(flowObjectName);
    var taskDoneMatch = _s.endsWith(eventName, activityEndHandlerPostfix);

    if (flowObject) {
        this.logger.trace("Trigger " + flowObject.type + " '" + flowObject.name + "'", data);
        if (flowObject.isStartEvent) {
            if (self.history.hasBeenVisited(eventName)) {
                throw new Error("The start event '" + eventName + "' cannot start an already started process.");
            } else {
                // start events create a token and put it on the first occurrence
                self._putTokenAt(flowObject, data);
            }
        } else if (flowObject.isIntermediateCatchEvent) {
            process.nextTick(function() {
                // We need this to achieve parallel collaborating processes
                // TODO: however, it is not completely clear to me whether this works in all circumstances
                self._emitEvent(INTERMEDIATE_CATCH_EVENT, eventName, data);
            });
        } else if (flowObject.isBoundaryEvent) {
            self._emitEvent(BOUNDARY_CATCH_EVENT, eventName, data);
        } else {
            self._putTokenAt(flowObject, data);
        }
    } else if (taskDoneMatch){
        throw new Error("The process '" + processDefinition.name + "' does cannot restart at the event '" + eventName + "'");
    } else {
        throw new Error("The process '" + processDefinition.name + "' does not know the event '" + eventName + "'");
    }
};

/**
 * Send a message by name to this process or along a message flow
 * @param {BPMNMessageFlow | String} messageFlow
 * @param {Object=} data
 */
BPMNProcess.prototype.sendMessage = function(messageFlow, data) {
    var self = this;

    if (typeof messageFlow === 'string') {
        this.triggerEvent(messageFlow, data);
    } else {
        if (messageFlow.targetProcessDefinitionId) {
            this.getParticipantById(messageFlow.targetProcessDefinitionId, function(err, partnerProcess) {
                var targetFlowObject = partnerProcess.processDefinition.getFlowObject(messageFlow.targetRef);
                var sourceFlowObject = self.processDefinition.getSourceFlowObject(messageFlow);

                self.logger.trace("Sending '" +
                    messageFlow.name + "' from '" +
                    sourceFlowObject.name + "' to '" +
                    targetFlowObject.name + "'.", data);

                partnerProcess.triggerEvent(targetFlowObject.name, data);
            });
        } else {
            throw new Error("sendMessage: the '" + messageFlow.name + "' has no targetProcessDefinitionId. Is the message flow target an executable pool?");
        }
    }
};

/**
 * @param {String} taskName
 * @param {Object} data
 */
BPMNProcess.prototype.taskDone = function(taskName, data) {
    this.logger.trace("Task '" + taskName + "' done.", data);
    this.emitActivityEndEvent(taskName, data);
};

/**
 * @param {String} participantName
 * @return {BPMNProcess}
 */
BPMNProcess.prototype.getParticipantByName = function(participantName, callback) {
    callback(null, this.participants[participantName]);
};

/**
 * @param {String} processDefinitionId
 * @return {BPMNProcess}
 */
BPMNProcess.prototype.getParticipantById = function(processDefinitionId, callback) {
    var participant = this.processDefinition.getParticipantById(processDefinitionId);

    callback(null, this.participants[participant.name]);
};

/**
 * @param {String} participantName
 * @param {BPMNProcess} bpmnProcess
 */
BPMNProcess.prototype.addParticipant = function(participantName, bpmnProcess) {
    this.participants[participantName] = bpmnProcess;
};

/**
 * @return {BPMNProcess}
 */
BPMNProcess.prototype.getParentProcess = function() {
    return this.parentProcess;
};

/**
 * @param {BPMNFlowObject} currentFlowObject
 * @param {Object=} data
 */
BPMNProcess.prototype._putTokenAt = function(currentFlowObject, data) {
    var self = this;
    var name = currentFlowObject.name;

    self.state.createTokenAt(name, self.processId);
    self.logger.debug("Token was put on '" + name + "'", data);
    self.onFlowObjectBegin(currentFlowObject, data, function() {
        self._emitEvent(TOKEN_ARRIVED_EVENT, name, data);
    });
};

/**
 * @param {String} currentFlowObjectName
 * @param {Function} done
 */
BPMNProcess.prototype._notifyBPMNEditor = function(currentFlowObjectName, done) {
    var self = this;
    var debuggerInterface = self.processDefinition.debuggerInterface;
    var flowObject = self.processDefinition.getFlowObjectByName(currentFlowObjectName);
    if (debuggerInterface && flowObject) {
        debuggerInterface.sendPosition(flowObject, self.logger, done);
    } else {
        done();
    }
};

/**
 * @param {Function} done
 * @private
 */
BPMNProcess.prototype._clearBPMNEditorState = function(done) {
    var self = this;
    var debuggerInterface = self.processDefinition.debuggerInterface;
    if (debuggerInterface) {
        debuggerInterface.sendPosition({}, self.logger, done);
    } else {
        done();
    }
};


/**
 * @param {Function} callback
 */
BPMNProcess.prototype.onTokenArrivedEvent = function(callback) {
    this.on(TOKEN_ARRIVED_EVENT, callback);
};

/**
 * @return {BPMNProcessState}
 */
BPMNProcess.prototype.getState = function() {
    return this.state;
};

/**
 * @param {object} extraInfo
 *  - an object with extra info to save into the process for further processing
 * @return {BPMNProcess}
 */
BPMNProcess.prototype.setProcessExtraInfo = function(extraInfo) {
    var self = this;
    var keys = _.keys(extraInfo);
    _.each(keys, function(key) {
        self[key] = extraInfo[key];
    });
    return self;
};

/**
 * @return {BPMNProcessHistory}
 */
BPMNProcess.prototype.getHistory = function() {
    return this.history;
};

/**
 * @return {BPMNProcessHistory.historyEntries}
 */
BPMNProcess.prototype.getHistoryEntries = function() {
    return this.history.historyEntries;
};

/**
 * @param id
 *  - the id/name of the step
 * @return {BPMNProcessHistory.historyEntries.entry}
 *  - There can be more than one entry in case of loops.
 *      So we return always the last entry
 */
BPMNProcess.prototype.getHistoryEntry = function(id) {
    var historyEntries = this.getHistoryEntries();
    for(var i = historyEntries.length - 1; i >= 0; --i) {
        var entry = historyEntries[i];
        if(entry.id === id || entry.name === id) {
            return entry;
        }
    }
    return;
};

/**
 * Updates a entry. But always the last history entry in case that it is a loop
 * @param id
 *  - the id/name of the step
 * @param newEntry
 *  - the data to set and replace the entry
 * @return {BPMNProcessHistory.historyEntries.entry}
 */
BPMNProcess.prototype.setHistoryEntry = function(id, newEntry) {
    var historyEntries = this.getHistoryEntries();
    for(var i = historyEntries.length - 1; i >= 0; --i) {
        var entry = historyEntries[i];
        if(entry.id === id || entry.name === id) {
            historyEntries[i] = newEntry;
            return entry;
        }
    }
    return;
};

/**
 *  Updates a entry data (the the full entry).
 *  But always the last history entry in case that it is a loop
 * @param id
 *  - the id or name of the step
 * @param data
 *  - the data to add to the entry data
 * @return {BPMNProcessHistory.historyEntries.entry}
 */
BPMNProcess.prototype.setHistoryEntryData = function(id, data) {

    if(data === undefined) {
        return;
    }

    var historyEntries = this.getHistoryEntries();
    for(var i = historyEntries.length - 1; i >= 0; --i) {
        var entry = historyEntries[i];
        if(entry.id === id || entry.name === id) {
            if(entry.data === undefined || entry.data === null) {
                entry.data = [];
            }
            if(_.isUndefined(data.createdAt)) {
                data.createdAt = getTimestamp();
            }
            entry.data.push(data);
            break;
        }
    }
    return entry;
};

/**
 *  Add a history entry data.
 *  But always the last history entry in case that it is a loop
 * @param id
 *  - the id or name of the step
 * @param data
 *  - the data to add to the entry data
 * @return {BPMNProcessHistory.historyEntries.entry}
 */
BPMNProcess.prototype.addHistoryEntryData = function(id, data) {

    if(data === undefined) {
        return;
    }

    var historyEntries = this.getHistoryEntries();
    for(var i = historyEntries.length - 1; i >= 0; --i) {
        var entry = historyEntries[i];
        if(entry.id === id || entry.name === id) {
            if(entry.data === undefined || entry.data === null) {
                entry.data = [];
            }
            if(_.isUndefined(data.createdAt)) {
                data.createdAt = getTimestamp();
            }
            entry.data.push(data);
            break;
        }
    }
    return entry;
};

/**
 * Adds one or more participants of the process
 * @param participants
 */
BPMNProcess.prototype.addParticipant = function(participants) {
    var aParticipants = this.getProperty('participants');
    if(_.isUndefined(aParticipants)) {
        aParticipants = [];
    }
    participants = _.isString(participants) ? [participants] : participants;
    aParticipants = _.uniq(_.union(aParticipants, participants), (item) => item);
    this.setProperty('participants', aParticipants);
}

/**
 * @param id
 *  - the id or name of the step
 * @param data
 *  - the data to add to the entry data
 * @return {BPMNProcessHistory.historyEntries.entry}
 */
BPMNProcess.prototype.setHistoryEntryData = function(id, data) {

    if(data === undefined) {
        return;
    }

    var historyEntries = this.getHistoryEntries();
    for(var i = historyEntries.length - 1; i >= 0; --i) {
        var entry = historyEntries[i];
        if(entry.id === id || entry.name === id) {
            entry.data = data;
            break;
        }
    }
    return entry;
};

/**
 * @return {*}
 */
BPMNProcess.prototype.getProperties = function() {
    return this.properties;
};

/**
 * @param {Object} query
 */
BPMNProcess.prototype.remove = function(query) {
    var self = this;
    var persistency = self.persistency;
    persistency.remove(query, function(err) {
        if(err) {
            var mainProcess = self.getMainProcess();
            mainProcess.logger.error("Cannot persist process '" + mainProcess.processId +
                "'. Process name: '" + mainProcess.processDefinition.name + "'. Error: " + err);
        }
    });
}

/**
 * @param {Boolean=} closeConnection
 */
BPMNProcess.prototype.persist = function(cb) {
    var mainProcess, doneSaving, persistentData;
    var persistency = this.persistency;

    if (persistency) {
        this.setDeferEvents(true);
        mainProcess = this.getMainProcess();
        doneSaving = function(error, savedData) {
            if (error) {
                mainProcess.logger.error("Cannot persist process '" + mainProcess.processId +
                    "'. Process name: '" + mainProcess.processDefinition.name + "'. Error: " + error);

                if (mainProcess.doneSavingHandler) {
                    mainProcess.doneSavingHandler.call(mainProcess.processClient, error);
                }
            } else {
                if (mainProcess.doneSavingHandler) {
                    mainProcess.doneSavingHandler.call(mainProcess.processClient, null, savedData);
                }

                mainProcess.logger.debug("SavedData: ", savedData);
                mainProcess._emitDeferredEvents();
            }

            if(cb) {
                cb(error, savedData);
            }
        };

        persistentData = {
            processName: mainProcess.processDefinition.name,
            processId: mainProcess.processId,
            parentToken: mainProcess.parentToken || null,
            properties: mainProcess.properties,
            state: mainProcess.state,
            history: mainProcess.history,
            pendingTimeouts: mainProcess.pendingTimerEvents.pendingTimeouts,
            views: mainProcess.views
        };
        persistency.persist(persistentData, doneSaving);
    }
};

/**
 * If we have a persistency layer that requires db connections, they are closed.
 * @param {Function} done
 */
BPMNProcess.prototype.closeConnection = function(done) {
    var persistency = this.persistency;
    if (persistency) {
        persistency.close(done);
    }
};


/**
 * @returns {BPMNProcess}
 */
BPMNProcess.prototype.getMainProcess = function() {
    var mainProcess;
    if (this.parentProcess) {
        mainProcess = this.parentProcess.getMainProcess();
    } else {
        mainProcess = this;
    }
    return mainProcess;
};

/**
 * @returns {Boolean}
 */
BPMNProcess.prototype.hasToDeferEvents = function() {
    var mainProcess = this.getMainProcess();
    return mainProcess.deferEvents;
};

/**
 * @param {Boolean} deferEvents
 */
BPMNProcess.prototype.setDeferEvents = function(deferEvents) {
    var mainProcess = this.getMainProcess();
    mainProcess.deferEvents = deferEvents;
};

/**
 */
BPMNProcess.prototype.loadPersistedData = function(callback) {
    var mainProcess, processId, processName, doneLoading;

    if(typeof callback !== 'function'){
        callback = function(){};
    }

    if (this.persistency) {
        this.setDeferEvents(true);
        mainProcess = this.getMainProcess();
        processId = mainProcess.processId;
        processName = mainProcess.processDefinition.name;
        doneLoading = function(error, loadedData) {

            if (error) {
                mainProcess.logger.error("Cannot load process '" + mainProcess.processId +
                    "'. Process name: '" + processName + "'. Error: " + error);
                if (mainProcess.doneLoadingHandler) {
                    mainProcess.doneLoadingHandler.call(mainProcess.processClient, error, loadedData);
                }
                callback(error, loadedData);
            } else {
                if (loadedData) {
                    try{
                        mainProcess.setPersistedData(loadedData);
                    } catch (error2) {
                        mainProcess.logger.error("Cannot load process '" + mainProcess.processId +
                            "'. Process name: '" + processName + "'. Error: " + error2);
                        if (mainProcess.doneLoadingHandler) {
                            mainProcess.doneLoadingHandler.call(mainProcess.processClient, error2, loadedData);
                        }
                        return callback(error2, loadedData);
                    }

                    mainProcess.createCalledProcesses(function(error3){
                        if(error3){
                            mainProcess.logger.error("Cannot load process '" + mainProcess.processId +
                                "'. Process name: '" + processName + "'. Error: " + error3);
                            if (mainProcess.doneLoadingHandler) {
                                mainProcess.doneLoadingHandler.call(mainProcess.processClient, error3, loadedData);
                            }
                            return callback(error3, loadedData);
                        }

                        if (mainProcess.doneLoadingHandler) {
                            mainProcess.doneLoadingHandler.call(mainProcess.processClient, null, loadedData);
                        }

                        mainProcess._emitDeferredEvents();
                        callback(null, loadedData);
                    });

                }else{
                    mainProcess._emitDeferredEvents();
                    callback(null, loadedData);
                }
            }

        };
        mainProcess.persistency.load(processId, processName, doneLoading);
    }else{
        if(callback){
            process.nextTick(function(){        // to stay consistent
                callback();
            });
        }
    }

};

/**
 */
BPMNProcess.prototype.createCalledProcesses = function(callback) {
    var self = this;
    var callActivityTokens = self.state.findCallActivityTokens();

    if(typeof callback !== 'function'){
        callback = function(){};
    }

    async.each(callActivityTokens, function(callActivityToken, done){
        var callActivityName = callActivityToken.position;
        var callActivity = self.processDefinition.getFlowObjectByName(callActivityName);
        callActivity.createCalledProcess(callActivityToken, self, createBPMNProcess, function(err, calledProcess){
            if(err){
                done(err);
            }
            calledProcess.createCalledProcesses(done);
        });
    }, callback);

};

BPMNProcess.prototype.setPersistedData = function(loadedData) {
    this.state = new BPMNProcessState(loadedData.state);
    this.history = new BPMNProcessHistory(loadedData.history);
    this.pendingTimerEvents = new BPMNPendingTimerEvents(this);
    this.pendingTimerEvents.restoreTimerEvents(loadedData.pendingTimeouts);
    this.properties = loadedData.properties || {};
};

/**
 * @param {String} name
 * @param {Object} value
 */
BPMNProcess.prototype.setProperty = function(name, value) {
    this.properties[name] = value;
};

/**
 * @param {String} name
 * @return {Object}
 */
BPMNProcess.prototype.getProperty = function(name) {
    return this.properties[name];
};

/**
 * @param {BPMNFlowObject} currentFlowObject
 * @param {Object} data
 * @param {Boolean=} returningFromCalledProcess
 * @private
 */
BPMNProcess.prototype._emitTokens = function(currentFlowObject, data, returningFromCalledProcess) {
    var activity;
    var self = this;

    self.state.removeTokenAt(currentFlowObject);

    if (currentFlowObject.isBoundaryEvent) {
        activity = self.processDefinition.getFlowObject(currentFlowObject.attachedToRef);
        self._clearBoundaryTimerEvents(activity);
        self.state.removeTokenAt(activity);
        self.onFlowObjectEnd(activity.name);
    } else {
        self._clearBoundaryTimerEvents(currentFlowObject);
    }

    if (currentFlowObject.isCallActivity || currentFlowObject.isSubProcess) {
        currentFlowObject.emitTokens(self, data, createBPMNProcess, returningFromCalledProcess);
    } else {
        currentFlowObject.emitTokens(self, data);
    }
};

/**
 * @param {String} eventName
 * @param {Object} data
 * @private
 */
BPMNProcess.prototype.emitActivityEndEvent = function(eventName, data) {
    this._emitEvent(ACTIVITY_END_EVENT, eventName, data);
};

/**
 * @param {BPMNFlowObject} currentFlowObject
 * @param {BPMNSequenceFlow} outgoingSequenceFlow
 * @param {Object} data
 */
BPMNProcess.prototype.emitTokenAlong = function(currentFlowObject, outgoingSequenceFlow, data) {
    var nextFlowObject = this.processDefinition.getProcessElement(outgoingSequenceFlow.targetRef);
    this._putTokenAt(nextFlowObject, data);
};

/**
 * @returns {Boolean}
 */
BPMNProcess.prototype.isDebuggerEnabled = function() {
    var debuggerInterface = this.processDefinition.debuggerInterface;
    return (debuggerInterface && debuggerInterface.isInDebugger());
};

/**
 * Called on begin of activities, task, catch events, etc.
 * @param {BPMNFlowObject} currentFlowObject
 * @param {Object} data
 * @param {Function} done
 * @private
 */
BPMNProcess.prototype.onFlowObjectBegin = function(currentFlowObject, data, done) {
    var self = this;
    var name = currentFlowObject.name;

    var finished = function() {
        if (self.onBeginHandler) {
            self.onBeginHandler.call(self.processClient, name, data, function() {
                done();
            });
        } else {
            done();
        }
    };

    self.history.addEntry(currentFlowObject, data);

    if(currentFlowObject.isStartEvent) {
        self.views.startEvent = self.history.historyEntries[0];
    }

    if (self.isDebuggerEnabled()) {
        this._notifyBPMNEditor(name, finished);
    } else {
        finished();
    }
};

/**
 * Called on end of activities, task, catch events, etc.
 * @param {String} currentFlowObjectName
 * @param {Object=} data
 * @param {Function=} done
 */
BPMNProcess.prototype.onFlowObjectEnd = function(currentFlowObjectName, data, done) {
    var self = this;
    var history = self.history;

    var finished = function() {
        history.setEnd(currentFlowObjectName);
        if(history.isFinished()){
            self.views.duration = history.finishedAt - history.createdAt;
        }
        // NOTE: done() MUST be called AFTER setEnd() because in done() the token is send to the next flowObjects
        if (done) {
            done();
        }
    };

    if (self.onEndHandler) {
        self.onEndHandler.call(self.processClient, currentFlowObjectName, data, finished);
    } else {
        finished();
    }
};

/**
 * Called on end of processes (also called processes)
 * @param {String} endEventName
 * @param {Boolean=} isMainProcess
 * @param {Function=} done
 */
BPMNProcess.prototype.onProcessEnd = function(endEventName, isMainProcess, done) {
    var self = this;
    var history = self.getHistory();

    var finished = function() {
        if (isMainProcess) {
            self.views.endEvent = history.getLastEntry(endEventName);
            // no parent implies we finish the main process
            // TODO: need a way to tell the outside in order to delete the object.
            // emit event ?
            // pass the manager to the process ?
            // pass a function that will be called here ?
            var funcs = [];

            funcs.push(function (next) {
                self.persist(function() {
                    next();
                });
            });

            funcs.push(function (next) {
                if(done) {
                    done();
                }
                next();
            });

            if(self.manager) {
                funcs.push(function (next) {
                    self.manager.cleanProcessCache(self.processId, function() {
                        next();
                    });
                });
            }

            async.series(funcs, function() { });
        } else {
            if(done) {
                done();
            }
        }
    };

    if (self.isDebuggerEnabled()) {
        self._clearBPMNEditorState(finished);
    } else {
        finished();
    }
};

/**
 * @param {BPMNProcess} calledProcess
 */
BPMNProcess.prototype.registerCalledProcess = function(calledProcess) {
    var calledProcessId = calledProcess.processId;
    this.calledProcesses[calledProcessId] = calledProcess;
};

/**
 * @param {String} calledProcessId
 */
BPMNProcess.prototype.unregisterCalledProcess = function(calledProcessId) {
    delete this.calledProcesses[calledProcessId];
};

/**
 * @param {BPMNActivity} currentActivity
 * @private
 */
BPMNProcess.prototype._registerBoundaryTimerEvents = function(currentActivity) {
    var self = this;
    var boundaryEvents = this.processDefinition.getBoundaryEventsAt(currentActivity);

    boundaryEvents.forEach(function(boundaryEvent) {
        if (boundaryEvent.isTimerEvent) {
            self.pendingTimerEvents.addBoundaryTimerEvent(boundaryEvent);
        }
    });
};

/**
 * @param {BPMNIntermediateCatchEvent} timerEvent
 * @private
 */
BPMNProcess.prototype._registerIntermediateTimerEvents = function(timerEvent) {
    this.pendingTimerEvents.addIntermediateTimerEvent(timerEvent);
};

/**
 * @param {BPMNFlowObject} currentFlowObject
 * @private
 */
BPMNProcess.prototype._clearBoundaryTimerEvents = function(currentFlowObject) {
    var self = this;
    var boundaryEvents = this.processDefinition.getBoundaryEventsAt(currentFlowObject);

    boundaryEvents.forEach(function(boundaryEvent) {
        if (boundaryEvent.isTimerEvent) {
            self.pendingTimerEvents.removeTimeout(boundaryEvent.name);
        }
    });
    self.persist();
};

/**
 * @private
 */
BPMNProcess.prototype._registerActivityEndEvents = function() {
    var self = this;

    self.on(ACTIVITY_END_EVENT, function(activityName, data) {
        var currentToken, owningProcessId, currentProcess, currentFlowObject, activityEndHandlerIsDone;
        var handlerName = handler.mapName2HandlerName(activityName) + activityEndHandlerPostfix;
        var trx = self.currentTrx = null;

        if(self.transactionLogger){
            trx = self.currentTrx = self.transactionLogger.startTransaction(self.processDefinition.name, 'PSTATE', 'TRANSITION', null, activityName+'Done');
        }

        if (self.state.hasTokens(activityName)) {
            currentToken = self.state.getFirstToken(activityName);
            owningProcessId = currentToken.owningProcessId;
            currentProcess = owningProcessId === self.processId ? self : self.calledProcesses[owningProcessId];
            currentFlowObject = currentProcess.processDefinition.getFlowObjectByName(currentToken.position);
            activityEndHandlerIsDone = function(data) {
                if(trx) {
                    trx.processStateEnd(self.processDefinition.name, self.getProcessId(), activityName);
                    trx.end();
                }
                self.logger.trace("Calling done() of '" + handlerName + "'.");
                currentProcess._emitTokens(currentFlowObject, data, true);
            };
            self.logger.trace("Calling '" + handlerName + "' for " + ACTIVITY_END_EVENT + " '" + activityName + "'.");
            handler.callHandler(handlerName, currentProcess, data, activityEndHandlerIsDone);
        } else {
            self.callDefaultEventHandler(ACTIVITY_END_EVENT, activityName, handlerName,
                "Process cannot handle this activity because it is not currently executed.",
                function(){
                    if(trx){
                        trx.end();
                    }
                });
        }
    });
};

/**
 * @private
 */
BPMNProcess.prototype._registerThrowIntermediateEvents = function() {
    var self = this;

    self.on(INTERMEDIATE_CATCH_EVENT, function(eventName, data) {
        var catchIntermediateEventObject, eventCaughtHandler;
        var handlerName = handler.mapName2HandlerName(eventName);
        var trx = self.currentTrx = null;

        if(self.transactionLogger){
            trx = self.currentTrx = self.transactionLogger.startTransaction(self.processDefinition.name, 'PSTATE', 'TRANSITION', null, eventName);
        }

        if (self.state.hasTokens(eventName)) {
            if(trx) {
                trx.processEvent(self.processDefinition.name, self.getProcessId(), eventName);
            }
            catchIntermediateEventObject = self.processDefinition.getFlowObjectByName(eventName);
            eventCaughtHandler = function(data) {
                if(trx){
                    trx.end();
                }
                self.logger.trace("Calling done() of '" + handlerName + "'.");
                self._emitTokens(catchIntermediateEventObject, data, true);
            };
            self.logger.trace("Calling '" + handlerName + "' for " + INTERMEDIATE_CATCH_EVENT + " '" + eventName + "'.");
            handler.callHandler(handlerName, self, data, eventCaughtHandler);
        } else {
            self.callDefaultEventHandler(INTERMEDIATE_CATCH_EVENT, eventName, handlerName, "Process cannot handle the intermediate event ' + " +
                eventName + "' because the process '" + self.processDefinition.name + "' doesn't expect one.",
                function(){
                    if(trx){
                        trx.end();
                    }
                });
        }
    });
};

/**
 * @private
 */
BPMNProcess.prototype._registerThrowBoundaryEvents = function() {
    var self = this;

    self.on(BOUNDARY_CATCH_EVENT, function(eventName, data) {
        var handlerName = handler.mapName2HandlerName(eventName);
        var catchBoundaryEventObject = self.processDefinition.getFlowObjectByName(eventName);
        var activity = self.processDefinition.getFlowObject(catchBoundaryEventObject.attachedToRef);
        var trx = self.currentTrx = null;

        if(self.transactionLogger){
            trx = self.currentTrx = self.transactionLogger.startTransaction(self.processDefinition.name, 'PSTATE', 'TRANSITION', null, eventName);
        }

        self.logger.trace("Catching boundary event '" + eventName + "' done.", data);

        if (self.state.hasTokensAt(activity)) {
            if(trx) {
                trx.processStateEnd(self.processDefinition.name, self.getProcessId(), activity.name);
            }
            self.state.removeTokenAt(activity);
            self._putTokenAt(catchBoundaryEventObject, data);
        } else {
            self.callDefaultEventHandler(BOUNDARY_CATCH_EVENT, eventName, handlerName, "Process cannot handle the boundary event '" +
                eventName + "' because the activity '" + activity.name + "' doesn't expect one.",
                function(){
                    if(trx) {
                        trx.end();
                    }
                });
        }
    });
};

/**
 * @private
 */
BPMNProcess.prototype._registerOnTokenArrivedEvent = function() {
    var self = this;

    self.onTokenArrivedEvent(function(currentFlowObjectName, data) {
        var handlerDone;
        var currentFlowObject = self.processDefinition.getFlowObjectByName(currentFlowObjectName);
        var trx = self.currentTrx;

        self.logger.debug("Token arrived at " + currentFlowObject.type + " '" + currentFlowObject.name + "'", data);
        if (currentFlowObject.isIntermediateCatchEvent) {
            // all intermediate event handlers are called WHEN the event occurs
            // TODO: should we change this?
            if (currentFlowObject.isTimerEvent) {
                self._registerIntermediateTimerEvents(currentFlowObject);
            }
            self.persist();
        } else {
            handlerDone = function(data) {
                if (currentFlowObject.isWaitTask) {
                    if(trx){
                        trx.end();
                    }
                    self._registerBoundaryTimerEvents(currentFlowObject);
                    self.persist();
                } else if (currentFlowObject.isCallActivity || currentFlowObject.isSubProcess) {
                    if(trx){
                        trx.end();
                    }
                    self._registerBoundaryTimerEvents(currentFlowObject);
                    self._emitTokens(currentFlowObject, data);
                } else if(currentFlowObject.isActivity) {
                    if(trx) {
                        trx.processStateEnd(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                        trx.end();
                    }
                    self._emitTokens(currentFlowObject, data);
                } else if (currentFlowObject.isExclusiveGateway) {
                    self._emitTokens(currentFlowObject, data);
                } else {
                    if(trx){
                        trx.end();
                    }
                    self._emitTokens(currentFlowObject, data);
                }
            };

            if(currentFlowObject.isBoundaryEvent && trx){
                if(trx) {
                    trx.processEvent(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                }
            }else{
                if(self.transactionLogger) {
                    trx = self.currentTrx = self.transactionLogger.startTransaction(self.processDefinition.name, 'PSTATE', 'TRANSITION', null, currentFlowObjectName);

                    if (currentFlowObject.isActivity) {
                        trx.processStateStart(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                    } else if (currentFlowObject.isIntermediateThrowEvent) {
                        trx.processEvent(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                    } else if (currentFlowObject.isStartEvent) {
                        trx.processStart(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                    } else if (currentFlowObject.isEndEvent) {
                        trx.processEnd(self.processDefinition.name, self.getProcessId(), currentFlowObjectName);
                    }
                }
            }

            handler.callHandler(currentFlowObjectName, self, data, handlerDone);
        }
    });
};

/**
 * @param {String} eventType
 * @param {String} eventName
 * @param data
 * @private
 */
BPMNProcess.prototype._emitEvent = function(eventType, eventName, data) {
    data = data || {};
    if (this.hasToDeferEvents()) {
        this.deferredEvents.push({type: eventType, name: eventName, data: data});
    } else {
        this.emit(eventType, eventName, data);
    }
};

/**
 * @private
 */
BPMNProcess.prototype._emitDeferredEvents = function() {
    var self = this;

    this.setDeferEvents(false); // we have to reset this flag, otherwise the deferred events we try to emit now would be deferred again!
    this.deferredEvents.forEach(function(event) {
        self.logger.trace("Emitting deferred events " + event.type + " '" + event.name + "'", event.data);
        process.nextTick(function(){
            self.emit(event.type, event.name, event.data)
        });
    });
    this.deferredEvents = [];
};

/**
 * @param {String} currentFlowObjectName
 */
BPMNProcess.prototype.clearBoundaryTimerEvents = function(currentFlowObjectName) {
    var activity;
    var self = this;

    var currentFlowObject = self.processDefinition.getFlowObjectByName(currentFlowObjectName);

    if (currentFlowObject.isBoundaryEvent) {
        activity = self.processDefinition.getFlowObject(currentFlowObject.attachedToRef);
        self._clearBoundaryTimerEvents(activity);
        self.state.removeTokenAt(activity);
        self.onFlowObjectEnd(activity.name);
    } else {
        self._clearBoundaryTimerEvents(currentFlowObject);
    }
};

/**
 * @param {String} eventType
 * @param {String?} currentFlowObjectName
 * @param {String} handlerName
 * @param {String} reason
 * @param {Function=} done
 */
BPMNProcess.prototype.callDefaultEventHandler = function(eventType, currentFlowObjectName, handlerName, reason, done, data) {
    this.logger.trace("Unhandled event: '" + eventType + "' for '" + currentFlowObjectName + "'. Handler: " + handlerName + "'. Reason: " + reason);
    this.defaultEventHandler.call(this.processClient, eventType, currentFlowObjectName, handlerName, reason, done);
};

/**
 * @param {{toString, stack}} error
 */
function logDefaultedErrors(error) {
    console.log("Unhandled error: '" + error + "' Stack trace: " + error.stack);
}
