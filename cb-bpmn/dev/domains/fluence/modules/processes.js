const _ = require('lodash');
const HD = require('@docbrasil/hd').utils;
const Domains = require('@docbrasil/hd').domains;
const Mongoose = require('mongoose');
const Behaviours = require('@docbrasil/hd-behaviours');
const Decorators = require('@docbrasil/hd-decorators');
const BPMN = require('@docbrasil/bpmn');
const Path = require("path");
const Async = require("async");
const FS = require('fs');
const Moment = require('moment');
const Task = require('@docbrasil/hd').process.tasks();
const Boom = require('boom');
const UIID = require('uuid');

const Schema = Mongoose.Schema;
const modelName = "processes";

const crudDecorator = { plugin: Decorators.crud,
    options: {
        exposeRoutes: { admin: true, api: false }
    }
};

const behaviours = [ ];
const decorators = [ crudDecorator ];

let LocalSchema = new Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    filename: { type: String, required: true },
    properties: { type: Object }
});

// LocalSchema.index({ "$**" : "text" }, { name: 'stringFields', language: 'portuguese', language_override: 'language' });

let selectFields = "";

Behaviours.api.addPlugins(LocalSchema, behaviours);
Decorators.api.addPlugins(LocalSchema, decorators);

let internals = {
    manager: null
};

internals.createProcessId = (sep) => {
    let guid = UIID.v1();
    let separator = (_.isUndefined(sep) ? '' : sep);
    return guid.replace(/-/g, separator);
}

internals.setProcessData = (process, lastTask, payload, stepId) => {

    if(_.isUndefined(lastTask) || _.isUndefined(lastTask.data)) {
        return;
    }

    // update the last task data
    if(payload.selectedDocs) {
        lastTask.data.selectedDocs = payload.selectedDocs;
    }
    if(payload.selectedAssignees) {
        lastTask.data.selectedAssignees = payload.selectedAssignees;
    }
    lastTask.data.formData = payload.formData;
    lastTask.data.stepProperties.formData = payload.formData;
    internals.setStepData(process, payload.formData, payload.selectedDocs, payload.selectedAssignees, stepId);
}

internals.setStepData = (process, formData, selectedDocs, selectedAssignees, stepId) => {
    var stepsProperties = process.getProperty('stepsProperties');
    var stepProperty = _.find(stepsProperties, function(item) { return item.id === stepId; });
    stepProperty.formData = formData;
    stepProperty.selectedDocs = selectedDocs;
    stepProperty.selectedAssignees = selectedAssignees;
    process.setProperty('stepsProperties', stepsProperties);
}

internals.getLastUserTaskFromEntry = (entry) => {
    return internals.getLastUserTask(internals.getUserTasks(entry));
}

internals.getPreviousUserTaskFromEntry = (entry) => {
    return internals.getPreviousUserTask(internals.getUserTasks(entry));
}

internals.getLastUserTask = (userTasks) => {
    let lastTask = userTasks[userTasks.length - 1];
    return lastTask || {};
}

internals.getPreviousUserTask = (userTasks) => {
    if(userTasks.length >= 2) {
        let previousTask = userTasks[userTasks.length - 2];
        return previousTask || {};
    }
    return;
}

internals.isUserTask = (type) => {
    return type.toLowerCase() === 'usertask' || type.toLowerCase() === 'task' || type.toLowerCase() === 'startevent';
}

internals.getUserTasks = (entry) => {
    let userTasks = _.filter(entry.data, (item) => internals.isUserTask(item.type));
    return userTasks || [];
}

LocalSchema.statics.updateProcessesStepProperties = function(stepsProperties, fluences, cb) {
    let funcs = [];

    let _updateSteps = (process, stepsProperties) => {
        let historyEntries = _.get(process, 'history.historyEntries');
        _.each(historyEntries, (historyEntry) => {
            _.each(historyEntry.data, (entryItem) => {
                let flowId = _.get(entryItem, 'data.flowId');
                let stepProperties = _.find(stepsProperties, item => item.id === flowId);
                if(stepProperties) {
                    let processStepProperties = _.get(entryItem, 'data.stepProperties');
                    _.set(entryItem, 'data.stepProperties', _.defaultsDeep(stepProperties, processStepProperties));
                }
            });
        });
        return historyEntries;
    }

    // upadate each process
    _.each(fluences, (process) => {
        funcs.push((next)  => {
            let processStepsProperties = _.get(process, 'properties.stepsProperties');
            let historyEntries = _updateSteps(process, stepsProperties);
            if(historyEntries !== null && !_.isEmpty(historyEntries)) {
                Domains.fluence().dcrud.findByIdAndUpdate(process._id, {
                    'properties.stepsProperties': _.defaultsDeep(stepsProperties, processStepsProperties),
                    'history.historyEntries': historyEntries
                }, () => {
                    model.getBPMNProcess(process.processId, (err, bpmnProcess) => {
                        if(!err && bpmnProcess !== null) {
                            bpmnProcess.loadPersistedData((err, loadedData) => {
                                next();
                            });
                        } else {
                            next();
                        }
                    });
                });
            } else {
                next();
            }
        });
    });

    Async.parallelLimit(funcs, 10, (err) => {
        cb(err, { success: !err });
    });

}

LocalSchema.statics.updateStepsProperties = function(options, cb) {
    let orgId = options.params.orgId;
    let orgProcessId = options.params.id;
    let stepsProperties = options.payload.stepsProperties;
    let source = options.api;
    let fluences = [];

    if(source !== 'admin' || orgId === '') {
        return cb(HD.errors.unauthorizedAction);
    }

    let funcs = [];

    // get all opened processes
    funcs.push((next)  => {
        Domains.fluence().dcrud.find({ 'properties.info.orgId': orgId, 'properties.info.orgProcessId': orgProcessId, 'history.finishedAt': null }).lean().exec((err, retFluences) => {
            if(!err && retFluences !== null) {
                fluences = retFluences;
            }
            next(err);
        });
    });

    // upadate each process
    funcs.push((next)  => {
        // model.updateProcessesStepProperties(stepsProperties, fluences, (err) => {
        //     next(err);
        // });
        model.updateProcessesStepProperties(stepsProperties, fluences, (err) => {
            next(err);
        });
    });

    Async.series(funcs, (err) => {
        cb(err, { success: !err });
    });
}

LocalSchema.statics.removeSelectedProcesses = function(options, cb) {
    let orgId = options.params.orgId;
    let user = options.user;
    let source = options.api;

    if(source !== 'admin' || orgId === '' || !Domains.users().isSUSync(user)) {
        return cb(HD.errors.unauthorizedAction);
    }

    let funcs = [];
    let ids = options.payload.ids;

    _.each(ids, (orgProcessId) => {
        funcs.push((next)  => {
            model.removeOrgProcessProcesses(orgId, orgProcessId, (err) => {
                next(err);
            });
        });
    });

    Async.parallelLimit(funcs, 10, (err) => {
        cb(err, { success: !err });
    });
}

LocalSchema.statics.removeProcess = function(orgId, processId, cb) {
    // Now we need to remove everything that relates to this organization
    let funcs = [];

    // Remove Fluence
    funcs.push(next => {
        Domains.fluence().dcrud.remove({ 'properties.info.orgId': orgId, processId }).lean().exec((err, retInfo) => {
            next(err);
        });
    });

    // Remove processes_task
    funcs.push(next => {
        Domains.processes_task().dcrud.remove({ orgId, processId }, (err) => {
            next(err);
        });
    });

    Async.series(funcs, (err) => {
        cb(err, { success: !err });
    });
}

LocalSchema.statics.removeOrgProcessProcesses = function(orgId, orgProcessId, cb) {
    // Now we need to remove everything that relates to this organization
    let funcs = [];

    // Remove Fluence
    funcs.push(function(next) {
        Domains.fluence().dcrud.remove({ 'properties.info.orgId': orgId, 'properties.info.orgProcessId': orgProcessId }).lean().exec(function(err, retInfo) {
            next(err);
        });
    });

    // Remove processes_task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.remove({ orgId, orgProcessId }, function(err) {
            next(err);
        });
    });

    // clean the lastSequence from the org process
    funcs.push(function (next) {
        Domains.orgprocesses().dcrud.findByIdAndUpdate(orgProcessId, {lastProtocolSeq: 0}).exec(function (err, retInfo) {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, { success: !err });
    });
}

LocalSchema.statics.removeProcesses = function(options, cb) {
    let orgId = options.params.orgId;
    let user = options.user;
    let source = options.api;

    if(source !== 'admin' || orgId === '' || !Domains.users().isSUSync(user)) {
        return cb(HD.errors.unauthorizedAction);
    }

    // Now we need to remove everything that relates to this organization
    let funcs = [];

    // Remove Fluence
    funcs.push(function(next) {
        Domains.fluence().dcrud.remove({ 'properties.info.orgId': orgId }).lean().exec(function(err, retInfo) {
            next(err);
        });
    });

    // Remove processes_task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.remove({ orgId: orgId }, function(err) {
            next(err);
        });
    });

    // clean the lastSequence from org processes
    funcs.push(function(next) {
        Domains.orgprocesses().dcrud.update({ orgId: orgId }, { lastProtocolSeq: 0 }, { multi: true }).exec(function(err, retInfo) {
            next(err);
        });
    });

    // clean the lastSequence from organization
    funcs.push(function(next) {
        Domains.organizations().dcrud.findByIdAndUpdate(orgId, { lastProtocolSeq: 0 }).lean().exec(function(err, retData) {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, { success: !err });
    });
}

LocalSchema.statics.getBPMNProcess = function(id, select, cb) {
    if(_.isFunction(select)) {
        cb = select;
        select = {};
    }
    let query =  Domains.fluence().dcrud.findOne({ processId: id });
    if(!_.isEmpty(select)) {
        query.select(select);
    }
    query.lean().exec((err, retProcess) => {
        cb(err, retProcess);
    });
}

LocalSchema.statics.getExecProcess = function(id, cb) {
    internals.manager.get(id, function(err, retProcess) {
        cb(err, retProcess);
    });
}

LocalSchema.statics.createProcessName = function(orgProcessId) {
    return orgProcessId;
}

LocalSchema.statics.initManager = function(cb) {
    let serverConfig = Domains.serverconfig();
    if(internals.manager == null) {
        internals.manager = new BPMN.ProcessManager({
            persistencyOptions: {
                uri: serverConfig.db.host,
                model: Domains.fluence()
            }
        });
    }

    Domains.orgprocesses().dcrud.find({
        status: Domains.orgprocesses().status.APPROVED
    }).lean().exec(function(err, retOrgProcesses) {
        if(!err && retOrgProcesses !== null) {
            _.each(retOrgProcesses, function(process) {
                let pName = model.createProcessName(process._id.toString());
                let handlers = process.handlers && process.handlers.length >= 1 && process.handlers[0].js ? process.handlers[0].js : '';
                let handlerJS = Domains.require_string().compile(handlers, pName, false);
                try {
                    internals.manager.addBpmnXML(process.xml, pName, handlerJS);
                    console.log('Loading process: ', pName);
                } catch (ex) {
                    if(ex.bpmnParseErrors) {
                        console.log(process.orgId, process.name, JSON.stringify(ex.bpmnParseErrors));
                    } else {
                        console.log(process.orgId, process.name, ex);
                    }
                }
            });
        }
        cb(err);
    });
}

LocalSchema.statics.getBPMNProcess = function(processId, cb) {
    let process = null;
    if(internals.manager) {
        internals.manager.get(processId, (err, retProcess) => {
            if(!err && retProcess !== null) {
                process = retProcess;
            }
            cb(null, process);
        });
    }
}

LocalSchema.statics.reloadProcess = function(processId, orgProcess, cb) {
    let fluence;
    let handlers = [];
    let funcs = [];
    let process;

    funcs.push(next => {
        let select = {
            'properties.info.orgId': 1,
            'properties.info.orgProcessId': 1,
            'properties.info.xml': 1,
            'properties.info.handlers': 1
        };
        Domains.fluence().dcrud.findOne({ processId }).select(select).lean().exec((err, retFluence) => {
            if(!err && retFluence !== null) {
                fluence = retFluence;
            }
            next();
        });
    });

    funcs.push(next => {
        let orgProcessId = _.get(fluence, 'properties.info.orgProcessId');
        if(orgProcess) {
            handlers = orgProcess.handlers;
            next();
        } else {
            Domains.orgprocesses().dcrud.findById(orgProcessId).select({handlers: 1}).lean().exec((err, retOrgProcess) => {
                if (!err && retOrgProcess !== null) {
                    orgProcess = retOrgProcess;
                    handlers = retOrgProcess.handlers;
                }
                next(err);
            });
        }
    });

    funcs.push(next => {
        let pName = model.createProcessName(orgProcess._id.toString());
        let xml = _.get(fluence, 'properties.info.xml');
        let handlerJS = Domains.require_string().compile(handlers, pName, false);
        let processDescriptor = { name: pName, id: processId };
        try {
            internals.manager.addBpmnXML(xml, pName, handlerJS);
            internals.manager.createProcess(processDescriptor, function (err, retProcess) {
                if(err || retProcess === null) {
                    next(Boom.forbidden('Não é possível re-iniciar o processo nesse momento. Verifique se esse processo e o organograma estejam aprovados.'));
                } else {
                    process = retProcess;
                    next();
                }
            });
        } catch (ex) {
            if(ex.bpmnParseErrors) {
                console.log(process.orgId, process.name, JSON.stringify(ex.bpmnParseErrors));
            } else {
                console.log(process.orgId, process.name, ex);
            }
            next(ex);
        }
    });

    Async.series(funcs, (err) => {

        cb(err, process);
    });
}

LocalSchema.statics.getParticipantsFromGroup = function(userId, orgId, participantGroups, cb) {
    let participantGroupsIds = _.map(participantGroups, 'group');
    Domains.orgchart().getGroupsUsers(orgId, participantGroupsIds, (err, retGroups) => {
        let aUsers = [];
        _.each(retGroups, (groupInfo) => {
            let participantGroup = _.find(participantGroups, (item) => item.group === groupInfo.group);
            if(participantGroup) {
                // Check if the creator of the process is in the group
                // if the type is Criador no Grupo (Usuário), we don't need to do anything, since the creator is already added to the process participants
                let creatorInGroup = _.find(groupInfo.users, item => item.user._id === userId) ? true : false;
                if (participantGroup.type === 'Grupo') {
                    aUsers = _.union(aUsers, _.map(groupInfo.users, (item) => item.user._id));
                } else if (participantGroup.type === 'Dono do Grupo') {
                    aUsers = _.union(aUsers, [_.find(groupInfo.users, (item) => item.isBoss).user._id]);
                } else if (participantGroup.type === 'Criador no Grupo (Grupo)' && creatorInGroup) {
                    // only add the group if the creator is in the group
                    aUsers = _.union(aUsers, _.map(groupInfo.users, (item) => item.user._id));
                }
            }
        });
        aUsers = _.uniq(aUsers);
        cb(null, aUsers);
    });

}

LocalSchema.statics.checkProcessStatus = function(request, orgId, cb) {
    let funcs = [];
    let user = HD.getUser(request);
    let userOrgId = user.orgId;

    funcs.push(function(next) {
        if(orgId !== userOrgId)
            next(Boom.unauthorized('Você não está autorizado a executar esse processo.'));
        else
            next();
    });

    funcs.push(function(next) {
        Domains.config().getGlobal(function(err, config) {
            if(!err && config != null) {
                next(config.disableProcess ? HD.errors.processDisabled : null);
            } else
                next(Boom.forbidden('Ações com processos foram desabilitadas temporariamente! Tente mais tarde novamente.'));
        });
    });

    funcs.push(function(next) {
        Domains.orgchart().dcrud.findOne({ orgId: orgId, status:  Domains.orgchart().status.PUBLISHED }).select({ _id: 1 }).lean().exec(function(err, retOrgChart) {
            if(!err && retOrgChart != null)
                next();
            else
                next(Boom.forbidden('Ações com processos foram desabilitadas temporariamente! Tente mais tarde novamente.'));
        });
    });

    Async.series(funcs, function(err) {
        cb(err);
    });
}

LocalSchema.statics.start = function(options, cb) {
    let orgId = options.params.orgId;
    let orgProcessId = options.params.id;
    let payload = options.payload;
    let funcs = [];
    let orgProcess;
    let protocol;
    let process;
    let stepsProperties;
    let processId = internals.createProcessId();
    let user = options.user ? options.user : HD.getUser(options.request);
    let userId = user._id.toString();
    let participants = [userId];
    let updSequence;
    let taskId;
    let flowId;
    let flow;
    let createdTaskAtStartEvent = false;
    let stepProperties;

    // check if we can execute the process
    funcs.push(next => {
        model.checkProcessStatus(options.request, orgId, function(err) {
            if(err) {
                next(Boom.forbidden('Não é possível iniciar o processo nesse momento. Verifique se esse processo ou o organograma estejam aprovados.'));
            } else {
                next();
            }
        });
    });

    // get the orgProcess
    funcs.push(next => {
        let orgProcessOpts = {
            orgId: orgId,
            _id: HD.ObjectID(orgProcessId),
            status: Domains.orgprocesses().status.APPROVED
        };
        Domains.orgprocesses().dcrud.findOne(orgProcessOpts).lean().exec((err, retOrgProcess) => {
            if(err || retOrgProcess === null) {
                next(Boom.forbidden('Não é possível iniciar o processo nesse momento. Verifique se esse processo está aprovado.'));
            } else {
                orgProcess = retOrgProcess;
                next();
            }
        });
    });

    // get the process participatns
    funcs.push(next => {
        if(!_.isEmpty(orgProcess.processParticipantsGroup)) {
            model.getParticipantsFromGroup(userId, orgId, orgProcess.processParticipantsGroup, (err, retUsers) => {
                if (!err && retUsers !== null) {
                    participants = _.uniq(_.union(participants, retUsers));
                }
                next();
            });
        } else {
            next();
        }
    });

    // create the protocol
    funcs.push(next => {
        Domains.organizations().dcrud.findById(orgId).select({ lastProtocolSeq: 1, protocolBase: 1 }).lean().exec((err, retOrg) => {
            if(err || retOrg === null) {
                next(Boom.forbidden('Não é possível iniciar o processo nesse momento. Verifique suas permissões para acessar essa empresa.'));
            } else {
                let organization = retOrg;
                let getFromOrgProcess = !_.isUndefined(orgProcess.protocolBase) && _.isString(orgProcess.protocolBase) && orgProcess.protocolBase !== '';
                let protocolBase = getFromOrgProcess ? orgProcess.protocolBase : organization.protocolBase;
                let lastProtocolSeq = getFromOrgProcess ? orgProcess.lastProtocolSeq : organization.lastProtocolSeq;
                lastProtocolSeq = parseInt(lastProtocolSeq, 10);
                if(_.isString(protocolBase) && protocolBase !== '') {
                    Moment.locale('pt-br');
                    protocol = protocolBase;
                    let aReplaces = protocolBase.match(/{{(.*?)}}/gm);
                    _.each(aReplaces, (item) => {
                        let value = '';
                        if(item === '{{rand}}') {
                            value = HD.documentCode();
                        } else if(item === '{{yy}}') {
                            value = new Date().getFullYear().toString().substr(-2);
                        } else if(item === '{{yyyy}}') {
                            value = new Date().getFullYear().toString();
                        } else if(item === '{{mm}}') {
                            value = Moment(new Date()).format('MM');
                        } else if(item === '{{mmm}}') {
                            value = Moment(new Date()).format('MMM');
                        } else if(item === '{{mmmm}}') {
                            value = Moment(new Date()).format('MMMM');
                        } else if(item === '{{dd}}') {
                            value = Moment(new Date()).format('DD');
                        } else if(item.indexOf('seq') !== -1) {
                            let cleanItem = item.replace(/{{|}}/g, '');
                            let split = cleanItem.split(':');
                            let initValue = parseInt(split[1], 10);
                            if(_.isNumber(lastProtocolSeq) && lastProtocolSeq > 0) {
                                initValue = lastProtocolSeq + 1;
                            }
                            value = initValue;
                            updSequence = {
                                lastProtocolSeq: initValue,
                                updWhere: getFromOrgProcess ? 'orgprocess' : 'organization',
                                id: getFromOrgProcess ? orgProcess._id : organization._id
                            };
                        }
                        protocol = protocol.replace(item, value);
                    });
                }
                next();
            }
        });
    });

    // update sequence
    funcs.push(next => {
        if(updSequence) {
            if(updSequence.updWhere === 'organization') {
                Domains.organizations().dcrud.findByIdAndUpdate(updSequence.id, { lastProtocolSeq: updSequence.lastProtocolSeq }, function(err, retData) {
                    next();
                });
            } else if(updSequence.updWhere === 'orgprocess') {
                Domains.orgprocesses().dcrud.findByIdAndUpdate(updSequence.id, { lastProtocolSeq: updSequence.lastProtocolSeq }, function(err, retData) {
                    next();
                });
            } else {
                next();
            }
        } else {
            next();
        }
    });

    // create the process
    funcs.push(next => {
        let name = model.createProcessName(orgProcess._id.toString());
        let processDescriptor = { id: processId, name };
        let handlers = orgProcess.handlers && orgProcess.handlers.length >= 1 && orgProcess.handlers[0].js ? orgProcess.handlers[0].js : '';
        let handlerJS = Domains.require_string().compile(handlers, name, true);
        // add the process if it has not yet been added
        internals.manager.addBpmnXML(orgProcess.xml, processDescriptor.name, handlerJS);
        internals.manager.createProcess(processDescriptor, function (err, retProcess) {
            if(err || retProcess === null) {
                next(Boom.forbidden('Não é possível iniciar o processo nesse momento. Verifique se esse processo e o organograma estejam aprovados.'));
            } else {
                process = retProcess;
                next();
            }
        });
    });

    // after creating the process. Update all the process info in properties
    funcs.push(next => {
        stepsProperties = orgProcess.stepsProperties || [];
        try {
            flow = _.find(process.getProcessDefinition().flowObjects, function (e) {
                return e.type === 'startEvent' && e.isStartEvent;
            });

            if (flow) {
                flowId = flow.bpmnId;
                process.addParticipant(participants);
                let info = {
                    processName: orgProcess.name,
                    processDescription: orgProcess.description,
                    processParticipantsGroup: orgProcess.processParticipantsGroup,
                    orgId,
                    orgProcessId,
                    userId,
                    userDepartment: user.department,
                    userSubDepartment: user.subdepartment,
                    userGroups: user.groups,
                    userName: user.name,
                    protocol,
                    xml: orgProcess.xml,
                    timezone: user.timezone
                };
                process.setProperty('info', info);
                process.setProperty('stepsProperties', stepsProperties);
                if(_.isEmpty(payload)) {
                    payload = {};
                }
                payload.initParamsUsed = false;
                process.setProperty('initParams', payload);
                next();
            } else {
                next(Boom.badRequest(`Não foi possível iniciar o processo! O processo ${orgProcess.name} não possui etapa inicial.`));
            }
        } catch (ex) {
            console.log(ex);
            next(Boom.badRequest(`Não foi possível iniciar o processo! O processo ${orgProcess.name} está desatualizado.`));
        }
    });

    // Create a task if the start event has a form
    funcs.push(next => {
        stepProperties = _.find(stepsProperties, item => item.id === flowId);
        if(stepProperties && stepProperties.orgFormId !== null && _.isString(stepProperties.orgFormId) && stepProperties.orgFormId !== '') {
            let task = new Task({ process, stepId: stepProperties.id });
            task.add((err, retTaskId) => {
                if (!err) {
                    taskId = retTaskId;
                    createdTaskAtStartEvent = true;
                }
                next();
            });
        } else {
            next();
        }
    });

    funcs.push(next => {
        process.triggerEvent(flow.name);
        next();
    });

    funcs.push(next => {
        if(createdTaskAtStartEvent) {
          // set process history
          let entryData = {
              taskId,
              type: 'userTask',
              data: {
                  start: new Date(),
                  end: null,
                  flowId,
                  flowName: flow.name,
                  processId: process.getProcessId(),
                  userId,
                  formId: 'adhoctramitar',
                  orgProcessId,
                  orgId,
                  taskId,
                  stepProperties,
                  userName: user.name
              }
          };
          process.addHistoryEntryData(flowId, entryData);
        }
        next();
    });

    funcs.push(next => {
        process.persist(() => {
            next();
        });
    });

    Async.series(funcs, (err) => {
        cb(err, {exec: err ? false : true, processId, taskId });
    });
}

LocalSchema.statics.stepHistory = function(options, cb) {
    let flowId = options.params.flowId;

    model.history(options, function(err, retHistory) {
        if(!err && retHistory != null && retHistory.historyEntries && _.isArray(retHistory.historyEntries)) {
            let flowHistories = _.filter(retHistory.historyEntries, (item) => item.id === flowId);

            // get the history together with all the flows that that have looped into history
            let flowData = [];
            _.each(flowHistories, (flow) => {
                flowData = _.union(flowData, flow.data);
            });

            retHistory.historyEntry = {};
            if(!_.isEmpty(flowHistories)) {
                let flowHistory = flowHistories[flowHistories.length - 1];
                if (!_.isEmpty(flowHistory)) {
                    flowHistory.data = flowData;
                    retHistory.historyEntry = flowHistory;
                }
            }
        }

        retHistory.flowId = flowId;
        retHistory.flowName = retHistory.historyEntry.name;

        // filter properties for this step
        delete retHistory.historyEntries;
        delete retHistory.processXML;
        cb(err, retHistory);
    });
}

LocalSchema.statics.setFormDataPermissions = function(userGroups, stepsProperties) {
    userGroups = _.map(userGroups, item => _.isObject(item) ? item : { group: item });
    _.each(stepsProperties, (stepProperties) => {
        let hasPermission = false;   // empty history permissions means permission!
        let permnissions = stepProperties ? stepProperties.permissions : [];
        permnissions = permnissions || [];
        for (var i = 0; i < permnissions.length; i++) {
            let permission = permnissions[i];
            if(permission.history === true) {
                if (permission.type === 'Grupo') {
                    hasPermission = !_.isUndefined(_.find(userGroups, (item) => item.group === permission.group));
                } else if (permission.type === 'Dono do Grupo') {
                    hasPermission = !_.isUndefined(_.find(userGroups, (item) => item.group === permission.group && item.isBoss));
                }
                if (hasPermission) {
                    break;
                }
            }
        }
        if(!hasPermission) {
            stepProperties.formData = []
        }
    });
}

LocalSchema.statics.setHistoryPermissions = function(orgProcess, userGroups, history) {
    let stepsProperties = orgProcess.stepsProperties;

    _.each(history.historyEntries, (historyEntry) => {
        let entryStep = _.find(stepsProperties, item => item.id === historyEntry.id);
        let hasPermission = false;   // empty history permissions means permission!
        let permnissions = entryStep ? entryStep.permissions : [];
        permnissions = permnissions || [];
        for (var i = 0; i < permnissions.length; i++) {
            let permission = permnissions[i];
            if(permission.history === true) {
                if (permission.type === 'Grupo') {
                    hasPermission = !_.isUndefined(_.find(userGroups, (item) => item.group === permission.group));
                } else if (permission.type === 'Dono do Grupo') {
                    hasPermission = !_.isUndefined(_.find(userGroups, (item) => item.group === permission.group && item.isBoss));
                }
                if (hasPermission) {
                    break;
                }
            }
        }
        historyEntry.permissions = permnissions;
        if(!hasPermission) {
            historyEntry.data = []
        }
    });
}

LocalSchema.statics.history = function(options, cb) {
    let user = HD.getUser(options.request);
    let funcs = [];
    let retHistory = {};
    let userGroups = [];
    let orgId = user.organization._id.toString();
    let userId = user._id.toString();
    let processId = options.request.params.id;
    let organization;
    let process;
    let orgProcess;
    let processXML;

    // get the users groups
    funcs.push(next => {
        Domains.orgchart().getUserGroupsDetails(orgId, userId, (err, retGroups) => {
            if(!err && retGroups !== null) {
                userGroups = retGroups;
            }
            next(err);
        });
    });

    // get the process
    funcs.push(next => {
        Domains.fluence().dcrud.findOne({ 'properties.info.orgId': orgId, processId }).lean().exec((err, retProcess) => {
            if(!err && retProcess !== null) {
                process = retProcess;
                processXML = _.get(process, 'properties.info.xml');
            }
            next(err);
        });
    });

    // get the organization
    funcs.push(next => {
        Domains.organizations().dcrud.findOne({ orgId }).lean().exec((err, retOrg) => {
            if(!err && retOrg !== null) {
                organization = retOrg;
            }
            next(err);
        });
    });

    // get the orgProcess, if we need to get the process XML (this is for backwards compatibility)
    funcs.push(next => {
        Domains.orgprocesses().dcrud.findById(process.properties.info.orgProcessId).lean().select({xml: 1, stepsProperties: 1}).exec((err, retOrgProcess) => {
            if (!err && retOrgProcess !== null) {
                orgProcess = retOrgProcess;
                if(!_.isString(processXML) || processXML === '' ) {
                    processXML = retOrgProcess.xml;
                }
            } else {
                err = Boom.preconditionFailed('Base do processo não foi encontrada para obter histório.');
            }
            next(err);
        });
    });

    // get the history
    funcs.push(next => {
        let processUser = {
            _id: _.get(process, 'properties.info.userId'),
            name: _.get(process, 'properties.info.userName'),
        };
        retHistory.owner = processUser;
        retHistory.user = processUser;
        retHistory.protocol = _.get(process, 'properties.info.protocol');
        retHistory.organization = organization;
        retHistory.createdAt = _.get(process, 'history.createdAt');
        retHistory.finishedAt = _.get(process, 'history.finishedAt');
        retHistory.historyEntries = _.cloneDeep(_.get(process, 'history.historyEntries'));
        retHistory.processXML = processXML;
        retHistory.name = _.get(process, 'properties.info.processName');
        retHistory.processId = process.processId;
        next();
    });

    // filter the history according to permissions
    funcs.push(next => {
        model.setHistoryPermissions(orgProcess, userGroups, retHistory);
        next();
    });

    Async.series(funcs, (err) => {
        cb(err, retHistory);
    });
}

LocalSchema.statics.xml = function(orgId, orgProcessId, cb) {
    Domains.orgprocesses().dcrud.findOne({ _id: HD.ObjectID(orgProcessId), orgId }).select({ filename: 1 }).lean().exec(function(err, retData) {
        let xml = '';
        if(!err && retData !== null) {
            xml = FS.readFileSync(Path.join(__dirname, `../../../bpmn/${retData.filename}/${retData.filename}.bpmn`), 'utf-8');
        }
        cb(null, { xml });
    });
}

LocalSchema.statics.execute = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let taskId = options.params.taskId;
    let processId = options.params.processId;
    let flowName = options.params.flowName;
    let payload = options.request.payload;
    let execProcess = null;
    let task = null;

    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, processId: processId, _id: HD.ObjectID(taskId), userId: userId, taskDone: false }).lean().exec(function(err, data) {
            if(!err) {
                if(data == null)
                    err = HD.errors.unauthorizedAction;
                else
                    task = data;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        model.getExecProcess(processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execProcess = retExecProcess;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        try {
            let data = execProcess.getProperty('data');
            data = _.isUndefined(data) ? {} : data;
            let obj = {};
            if(_.isUndefined(payload) || _.isEmpty(payload))
                payload = {};
            payload.taskId = taskId;
            payload.flowId = task.flowId;
            payload.flowName = flowName;
            payload.processId = processId;
            obj[taskId] = payload;
            let newData = _.merge({}, data, obj);
            newData[taskId].end = new Date();
            execProcess.setProperty('data', newData);
            execProcess.taskDone(flowName, newData);
            next();
        } catch(ex) {
            next(HD.errors.execTaskFail);
        }
    });

    funcs.push(function(next) {
        execProcess.persist(() => {
            next();
        });

    });

    funcs.push(function(next) {
        Domains.processes_task().dcrud.findByIdAndUpdate(taskId, { taskDone: true }, function(err, retUpdate) {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, err ? { response: 'NOTOK' } : { response: 'OK' } );
    });
}

LocalSchema.statics.restart = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let processId = options.params.id;
    let flowName = options.params.flowName;
    let execProcess = null;

    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    funcs.push(function(next) {
        model.reloadProcess(processId, null, (err, retProcess) => {
            if(!err && retProcess !== null) {
                execProcess = retProcess;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        try {
            // restart the process
            execProcess.restart();

            // add a new history entry to trigger the flowName that we are re-starting the process from
            let entryData = {
                flowName,
                type: 'processRestart',
                data: {
                    userId: userId,
                    userName: user.name,
                    orgId
                }
            };

            execProcess.addHistoryEntryData(flowName, entryData);
            execProcess.triggerRestartEvent(flowName);
            next();
        } catch(ex) {
            console.log('restart', ex);
            next(HD.errors.execTaskFail);
        }
    });

    funcs.push(function(next) {
        execProcess.persist(() => {
            next();
        });

    });

    Async.series(funcs, function(err) {
        let retVal = err ? { response: 'NOTOK' } : { response: 'OK' };
        console.log('End restart', retVal, err);
        cb(err, retVal );
    });
}

LocalSchema.statics.reexecute = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let processId = options.params.id;
    let flowName = options.params.flowName;
    let execProcess = null;

    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    funcs.push(function(next) {
        model.getExecProcess(processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execProcess = retExecProcess;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        try {
            // add a new history entry to trigger the flowName that we are re-starting the process from
            let entryData = {
                flowName,
                type: 'processReexecute',
                data: {
                    userId: userId,
                    userName: user.name,
                    orgId
                }
            };

            execProcess.addHistoryEntryData(flowName, entryData);
            execProcess.triggerRestartEvent(flowName);
            next();
        } catch(ex) {
            console.log('reexecute', ex);
            next(HD.errors.execTaskFail);
        }
    });

    funcs.push(function(next) {
        execProcess.persist(() => {
            next();
        });

    });

    Async.series(funcs, function(err) {
        let retVal = err ? { response: 'NOTOK' } : { response: 'OK' };
        console.log('End restart', retVal, err);
        cb(err, retVal );
    });
}

LocalSchema.statics.getPreviousProcess = function(options, cb) {
    let userId = options.userId;
    let orgId = options.orgId;
    let processName = options.processName;

    Domains.fluence().dcrud.find({ 'properties.info.orgId': orgId, 'properties.info.userId': userId, processName })
        .sort({ 'history.createdAt': -1 })
        .limit(2)
        .exec((err, retProcesses) => {
            if(_.isArray(retProcesses) && retProcesses.length === 2) {
                cb(null, retProcesses[1]);
            } else {
                cb(null, null);
            }
        });
}

LocalSchema.statics.adhoc = {};

LocalSchema.statics.adhoc.save = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let taskId = options.params.taskId;
    let processId = options.params.processId;
    let payload = options.request.payload;
    let execBPMNProcess = null;
    let task = null;

    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, processId: processId, _id: HD.ObjectID(taskId), userId: userId, taskDone: false }).lean().exec(function(err, data) {
            if(!err) {
                if(data == null) {
                    err = Boom.badRequest('Não foi possível salvar a tarefa. Verifique se a tarefa já não foi finalizada automaticamente.');
                }  else {
                    task = data;
                }
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        model.getExecProcess(processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
        try {
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let lastTask = internals.getLastUserTaskFromEntry(entry);
            if(lastTask) {
                internals.setProcessData(execBPMNProcess, lastTask, payload, task.flowId);
            }
            next();
        } catch(ex) {
            next(Boom.badRequest('Não foi possível salvar a tarefa. Verifique se a tarefa já não foi finalizada automaticamente.'));
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist();
        next();
    });

    Async.series(funcs, function(err) {
        cb(err, err ? { response: 'NOTOK' } : { response: 'OK' } );
    });
}

LocalSchema.statics.adhoc.process = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let taskId = options.params.taskId;
    let processId = options.params.processId;
    let payload = options.request.payload;
    let selectedAssignees = payload.selectedAssignees;
    let execBPMNProcess = null;
    let task = null;
    let lastTask = null;

    // validate that we have assignees
    funcs.push(function(next) {
        if(_.isUndefined(selectedAssignees) || !_.isArray(selectedAssignees) || selectedAssignees.length === 0) {
            next(Boom.badRequest('Não foi possível finalizar a tarefa. Verifique se a tarefa já não foi finalizada automaticamente.'));
        } else {
            next();
        }
    });

    // check if we can execute a process action
    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, processId: processId, _id: HD.ObjectID(taskId), userId: userId, taskDone: false }).lean().exec(function(err, data) {
            if(!err) {
                if(data == null)
                    err = HD.errors.unauthorizedAction;
                else
                    task = data;
            }
            next(err);
        });
    });

    // get the BPMN process
    funcs.push(function(next) {
        model.getExecProcess(processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // finalize and persist this current process step
    funcs.push(function(next) {
        try {
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            lastTask = internals.getLastUserTaskFromEntry(entry);
            if(lastTask) {
                internals.setProcessData(execBPMNProcess, lastTask, payload, task.flowId);
            }
            next();
        } catch(ex) {
            next(HD.errors.execTaskFail);
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist(() => {
            next();
        });
    });

    // finishes the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findByIdAndUpdate(taskId, { taskDone: true }, function(err, retUpdate) {
            next(err);
        });
    });

    // process the assignees and create new group and/or user tasks
    _.each(selectedAssignees, function(assignee) {
        funcs.push(function(next) {
            let stepProperties = lastTask.data.stepProperties;
            if(assignee.type === 'Grupo') {
                stepProperties.createTaskType = 'Grupo';
                stepProperties.groupToCreateTask = assignee.name;

            } else if(assignee.type === 'Usuário') {
                stepProperties.createTaskType = 'Usuário';
                stepProperties.userId = assignee.id;
            } else {
                return next(HD.errors.execTaskFail);
            }
            // create the task
            let initData = {
                formData: lastTask.data.formData
            };
            if(stepProperties.selectedDocsKeepValue) {
                initData.selectedDocs = lastTask.data.selectedDocs;
            }
            let task = new Task({ orgId, process: execBPMNProcess, stepProperties, initData });
            task.add(() => {
                next();
            });
        });
    });

    // process selectedDocs and storageStatus -> if present
    let selectedDocs = payload.selectedDocs;
    let storageStatus = payload.storageStatus;

    if(selectedDocs && storageStatus && selectedDocs.length > 0 && storageStatus !== '') {
        _.each(selectedDocs, function(selectedDoc) {
            funcs.push(function(next) {
                Domains.documents().dcrud.findByIdAndUpdate(selectedDoc.id, { storageStatus: storageStatus }, { new: true }).exec(function(err) {
                    next();
                });
            });
        });
    }

    Async.series(funcs, function(err) {
        cb(err, err ? { response: 'NOTOK' } : { response: 'OK' } );
    });
}

LocalSchema.statics.adhoc.end = function(options, cb) {
    let funcs = [];
    let user = HD.getUser(options.request);
    let userId = user._id.toString();
    let orgId = options.params.orgId;
    let taskId = options.params.taskId;
    let processId = options.params.processId;
    let flowName = options.params.flowName;
    let payload = options.request.payload;
    let execBPMNProcess = null;
    let task = null;


    // check if we can execute a process action
    funcs.push(function(next) {
        model.checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, processId: processId, _id: HD.ObjectID(taskId), userId: userId, taskDone: false }).lean().exec(function(err, data) {
            if(!err) {
                if(data == null) {
                    err = Boom.badRequest('Não foi possível finalizar a tarefa. Verifique se a tarefa já não foi finalizada automaticamente.');
                } else {
                    task = data;
                }
            }
            next(err);
        });
    });

    // get the BPMN process
    funcs.push(function(next) {
        model.getExecProcess(processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // finalize and persist this current process step
    funcs.push(function(next) {
        try {
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let lastTask = internals.getLastUserTaskFromEntry(entry);
            if(lastTask) {
                internals.setProcessData(execBPMNProcess, lastTask, payload, task.flowId);
            }
            next();
        } catch(ex) {
            next(HD.errors.execTaskFail);
        }
    });

    // finishes the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findByIdAndUpdate(taskId, { taskDone: true }).exec((err, retUpdate) => {
            next(err);
        });
    });

    // end the task
    funcs.push(function(next) {
        // add the user for that create the task
        let stepsProperties = execBPMNProcess.getProperty('stepsProperties');
        let stepProperty = _.find(stepsProperties, (item) => item.id === task.flowId);
        if(stepProperty) {
            stepProperty.userId = user._id.toString();
            stepProperty.userName = user.name;
        }
        // call task done
        execBPMNProcess.taskDone(flowName);
        next();
    });

    funcs.push(function(next) {
        execBPMNProcess.persist(() => {
            next();
        });

    });

    Async.series(funcs, function(err) {
        cb(err, err ? { response: 'NOTOK' } : { response: 'OK' } );
    });
}

LocalSchema.statics.searchProcess = function(options, cb) {
    let user = options.user ? options.user : HD.getUser(options.request);

    if(user === null || _.isUndefined(user)) {
        return cb(null, []);
    }

    let orgId = user.orgId;
    let userId = user._id.toString();
    let userGroups = [];
    let funcs = [];
    let fluences = [];
    let searchOpts = {
        payload: {
            'properties.info.orgId': orgId,
            'properties.participants': userId
        },
        project: {
            'properties.info.userName': 1,
            'properties.info.userGroups': 1,
            'properties.info.protocol': 1,
            'properties.info.processName': 1,
            'properties.info.processDescription': 1,
            'properties.info.orgProcessId': 1,
            'properties.stepsProperties': 1,
            'history.createdAt': 1,
            'history.finishedAt': 1,
            processId: 1,
        },
        query: {}
    };

    options.payload = options.payload || {};

    // Query
    funcs.push(function (next) {
        // Search Text
        let text = _.get(options, 'payload.t');
        if(text) {
            searchOpts.payload['$text'] = { $search: text };
            // check if we have sort for relevance of the serach text
            let relevanceScore = _.get(options, 'payload.sort.score');
            if(relevanceScore) {
                searchOpts.project = {score: {$meta: "textScore"}};
            }
            delete options.payload.t;
        }
        next();
    });

    // Other options
    funcs.push(function (next) {

        // Pagination
        if(options.query.perPage) {
            searchOpts.query.perPage = parseInt(options.query.perPage, 10);
        }

        // Zero base initial page
        if(options.query.page) {
            searchOpts.query.page = parseInt(options.query.page, 10);
        }

        // Keyworkds
        if(options.payload.keywords) {
            searchOpts.payload = _.defaultsDeep(searchOpts.payload, options.payload.keywords);
            delete options.payload.keywords;
        }

        searchOpts.payload = _.defaultsDeep(searchOpts.payload, options.payload);

        next();
    });

    // get the users groups
    funcs.push(next => {
        Domains.orgchart().getUserGroupsDetails(orgId, userId, (err, retGroups) => {
            if(!err && retGroups !== null) {
                userGroups = retGroups;
            }
            next(err);
        });
    });

    funcs.push(next => {
        searchOpts.facet = {
            $facet: {
                'orgProcessId': [ { $sortByCount: '$properties.info.orgProcessId' } ],
                'userName': [ { $sortByCount: '$properties.info.userName' } ]
            }
        };

        Domains.fluence().getQuery(searchOpts, function(err, retFluences) {
            if(!err && retFluences !== null) {
                fluences = retFluences;
            }
            next();
        });
    });

    funcs.push(next => {
        _.each(fluences.items, item => {
            model.setFormDataPermissions(userGroups, item.properties.stepsProperties);
        });
        next();
    });

    Async.series(funcs, (err) => {
        cb(err, fluences);
    });
}

// ****************************
// CONTEXT Calls
// ****************************
LocalSchema.statics.context = {};

LocalSchema.statics.context.userAction = function(request, reply, url, globalConfig, cb) {
    let funcs = [];
    let user = HD.getUser(request);
    let orgId = user.orgId;
    let userId = user._id.toString();
    let processId = request.params.id;
    let taskId = request.params.taskId;
    let context = {};
    let task = null;
    let contextOptions = {};
    let owner = {};
    let orgProcess = { reports: [] };
    let getDocuments = false;
    let getUsers = false;

    funcs.push(function(next) {
        Domains.users().dcrud.findById(userId).select({ name: 1 }).lean().exec(function(err, retOwner) {
            if(!err && retOwner != null) {
                owner = retOwner;
                next();
            } else {
                next(HD.errors.unauthorizedAction);
            }
        });
    });

    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ _id: HD.ObjectID(taskId), orgId: orgId, userId: userId, processId: processId})
            .select({ flowId: 1, flowName: 1, taskDone: 1, formId: 1, orgProcessId: 1, context: 1, processId: 1 })
            .lean()
            .exec(function(err, retTask) {
            if(!err && retTask != null) {
                context = retTask;
                context.task = _.clone(retTask);
                context.formIdPath =  `bpmn/${retTask.formId}`;
                task = retTask;
                next();
            } else {
                next(HD.errors.unauthorizedAction);
            }
        });
    });

    funcs.push(function(next) {
        Domains.orgprocesses().dcrud.findById(task.orgProcessId).select({ reports: 1 }).lean().exec(function(err, retOrgProcess) {
            if(!err && retOrgProcess != null) {
                orgProcess = retOrgProcess;
                next();
            } else {
                next(HD.errors.unauthorizedAction);
            }
        });
    });

    funcs.push(function(next) {
        let flowId = task.flowId;
        let query = Domains.fluence().dcrud.findOne({
            processId,
            'properties.stepsProperties':  { $elemMatch: { id: flowId } }
        });
        query.select({
            processId: 1,
            'properties.info.protocol': 1,
            'properties.info.processName': 1,
            "history.createdAt": 1,
            "history.finishedAt": 1,
            'properties.stepsProperties.$': 1
        });
        query.lean().exec((err, retProcess) => {
            if(!err && retProcess != null) {
                let stepProperties = _.get(retProcess, 'properties.stepsProperties.0');
                context.process = {
                    processId: retProcess.processId,
                    properties: retProcess.properties,
                    createdAt: retProcess.history.createdAt,
                    finishedAt: retProcess.history.finishedAt,
                    owner,
                    orgProcess,
                    formContext: true
                };

                getDocuments = stepProperties.showSearch;
                getUsers = stepProperties.showProcess;
            }
            next(err);
        });
    });

    funcs.push(function(next) {
       if(task && task.context) {
            request.contextParams = { getDocuments, getUsers };
            Domains.get(task.context.domain).context[task.context.func](request, reply, url, globalConfig, function(err, retContext, retContextOptions) {
                if(!err && retContext != null) {
                    context = _.merge({}, context, retContext);
                    contextOptions = retContextOptions;
                }
                next();
            });
       } else {
           next();
       }
    });

    // get the forms
    funcs.push(function(next) {
        Domains.orgforms().dcrud.find({ orgId: orgId }).lean().exec(function(err, retOrgForms) {
            if(!err && retOrgForms != null) {
                context.orgForms = retOrgForms;
                next();
            } else {
                next(HD.errors.unauthorizedAction);
            }
        });
    });

    Async.series(funcs, function(err) {
        if(err) {
            cb(err, {});
        } else {
            if(_.isUndefined(contextOptions)) {
                contextOptions = {};
            }
            contextOptions.process = 1;
            contextOptions.task = 1;
            contextOptions.orgForms = 1;
            cb(null, context, contextOptions);
        }
    });
}

let model = Mongoose.model(modelName, LocalSchema);

const domain =  {
    selectFields: selectFields,
    initManager: model.initManager,
    getBPMNProcess: model.getBPMNProcess,
    manager: internals.manager,
    context: model.context,
    start: model.start,
    restart: model.restart,
    reexecute: model.reexecute,
    history: model.history,
    stepHistory: model.stepHistory,
    checkProcessStatus: model.checkProcessStatus,
    execute: model.execute,
    getExecProcess: model.getExecProcess,
    getBPMNProcess: model.getBPMNProcess,
    removeProcess: model.removeProcess,
    removeProcesses: model.removeProcesses,
    removeSelectedProcesses: model.removeSelectedProcesses,
    searchProcess: model.searchProcess,
    updateStepsProperties: model.updateStepsProperties,
    xml: model.xml,
    getPreviousProcess: model.getPreviousProcess,
    isUserTask: internals.isUserTask,
    adhoc: model.adhoc
};

Behaviours.api.prepareModel(domain, model, behaviours);
Decorators.api.prepareModel(domain, model, decorators);

module.exports = domain;
