const _ = require('lodash');
const Domains = require('@docbrasil/hd').domains;
const HD = require('@docbrasil/hd').utils;
const Moment = require('moment');
const Async = require('async');

/**
 * Random number generators
 */
class Random {
    guid() {
        return HD.guid();
    }

    documentCode() {
        return HD.documentCode();
    }
}

/**
 * Format a string
 */
class Format {
    firstToUpper(value) {
        return HD.format.firstToUpper(value);
    }

    processName(value) {
        return HD.format.processName(value);
    }

    time(value, timezone) {
        return HD.format.time(value, timezone);
    }

    date(value, timezone) {
        return HD.format.date(value, timezone);
    }

    datetime(value, timezone) {
        return HD.format.datetime(value, timezone);
    }

    dateElapsed(value, timezone) {
        return HD.format.dateElapsed(value, timezone);
    }

    medianDate(value, timezone) {
        return HD.format.medianDate(value, timezone);
    }

    list(value, sep) {
        return HD.format.list(value, sep);
    }

    number(value) {
        return HD.format.numberFromUs(value);
    }

    numberFloat(value) {
        return HD.format.numberFloatUS(value);
    }

    numberInt(value) {
        return HD.format.numberInt(value);
    }

    elipses(value, size) {
        return HD.format.elipses(value, size);
    }

    age(value) {
        return HD.format.age(value);
    }
}

/**
 * Gets a value that is being stored and transform to display format
 */
class Get {
    text(value) {
        return HD.get.text(value);
    }

    string(value) {
        return HD.get.text(value);
    }

    duedate(value) {
        return HD.get.duedate(value);
    }

    number(value) {
        return HD.get.number(value);
    }

    currency(value) {
        return HD.get.currency(value);
    }

    date(value) {
        return HD.get.date(value);
    }

    cpf(value) {
        return HD.get.cpf(value);
    }

    idcard(value) {
        return HD.get.cpf(value);
    }

    cnpj(value) {
        return HD.get.cnpj(value);
    }

    orgidcard(value) {
        return HD.get.cnpj(value);
    }

    select(value) {
        return HD.get.select(value);
    }

    list(value) {
        return HD.get.list(value);
    }
}

/**
 * Check a value from display and prepare to be saved on a database
 */
class Check {
    string(value) {
        return HD.check.string(value);
    }

    array(value) {
        return HD.check.array(value);
    }

    shortDate(value) {
        return HD.check.shortDate(value);
    }

    number(value) {
        return HD.check.number(value);
    }

    currency(value) {
        return HD.check.currency(value);
    }

    date(value, format, timezone) {
        return HD.check.date(value, null, format, timezone);
    }

    cpf(value) {
        return HD.check.idCard(value);
    }

    cnpj(value) {
        return HD.check.orgCard(value);
    }

    text(value) {
        return HD.check.string(value);
    }

    duedate(value) {
        return HD.check.string(value);
    }

    list(value) {
        return HD.check.string(value);
    }

    select(value) {
        return HD.check.string(value);
    }
}

/**
 * Do transformations
 */
class Transform {

    /**
     * From a format of d.hh:mm:ss to milliseconds
     */
    toMilli(timer, def) {
        timer = HD.check.string(timer);
        let milli = parseInt(Moment.duration(timer).asMilliseconds(), 10);
        let defMilli = parseInt(def, 10);
        if(_.isNumber(milli) && milli > 0) {
            return milli;
        }
        return _.isNumber(defMilli) ? defMilli : Number.MAX_SAFE_INTEGER;
    }
}

/**
 * Class of utilities
 */
class Utils {
    constructor() {
        const self = this;
        self.random = new Random();
        self.format = new Format();
        self.get = new Get();
        self.check = new Check();
        self.transform = new Transform();
    }

    generateCPF() {
        return HD.generateCPF();
    }

    generateCNPJ() {
        return HD.generateCNPJ();
    }
}

/**
 * Class that defines all the available actions for processes
 * @class
 */
class Process {

    constructor() {
        const self = this;
        self.utils = new Utils();
    }

    /**
     * Ensures that a process has ended. That is, we do not have anything pending for a process
     * @param options
     *  - process
     * @param cb
     */
    end(options, cb) {
        const self = this;
        let process = options.process;
        let stepId = options.stepId;
        let stepProperties = self.getStepProperties(process, stepId);
        let funcs = [];
        let cancelTimerEvents = stepProperties ? stepProperties.cancelTimerEvents : true;
        let cancelAllTasks = stepProperties ? stepProperties.cancelAllTasks : true;
        let historyEntries = options.process.getHistoryEntries();
        let persist = false;

        if(cancelTimerEvents) {
            funcs.push(next => {
                // ensure all flows that have started to finish them
                _.each(historyEntries, (entry) => {
                    options.process.clearBoundaryTimerEvents(entry.name);
                });
                persist = true;
                next();
            });
        }

        if(cancelAllTasks) {
            funcs.push(next => {
                let processId = process.getProcessId();
                Domains.processes_task().dcrud.update({processId}, {taskDone: true}, {multi: true}).exec(() => {
                    next();
                });
            });
        }

        let removeProcess = false;
        // if we do not have timer events or tasks, then we are done with this process and should remove the process
        if(cancelAllTasks && cancelTimerEvents) {
            removeProcess = true;
        } else {
            // for each EndEvent, check if we have finished
            let finishedEndEvents = _.filter(historyEntries, item => item.type === 'endEvent' && item.end === null);
            if(_.isEmpty(finishedEndEvents.length)) {
                removeProcess = true;
            }
        }

        if(removeProcess) {
            funcs.push(next => {
                persist = true;
                options.process.setProperty('removeProcess', { remove: true });
                next();
            });
        }

        funcs.push(next => {
            options.process.persist(() => {
                next();
            });
        });

        Async.parallel(funcs, err => {
            cb(err);
        });
    }

    /**
     * Gets the last user task from an entry
     * @param entry
     * @return {*}
     */
    getLastUserTaskFromEntry(entry) {
        const self = this;
        return self.getLastUserTask(self.getUserTasks(entry));
    }

    /**
     * Gets the previous user task of an entry (if it exists)
     * @param entry
     * @return {*}
     */
    getPreviousUserTaskFromEntry(entry) {
        const self = this;
        return self.getPreviousUserTask(self.getUserTasks(entry));
    }

    /**
     * Get the last user task of userTasks
     * @param userTasks
     * @return {*|{}}
     */
    getLastUserTask(userTasks) {
        let lastTask = userTasks[userTasks.length - 1];
        return lastTask || {};
    }

    /**
     * get the previous user task of user tasks
     * @param userTasks
     * @return {*|{}}
     */
    getPreviousUserTask(userTasks) {
        if(userTasks.length >= 2) {
            let previousTask = userTasks[userTasks.length - 2];
            return previousTask || {};
        }
        return;
    }

    /**
     * Check if a type is a user task
     * @param type
     * @return {boolean}
     */
    isUserTask(type) {
        return Domains.processes().isUserTask(type);
    }

    /**
     * Get user tasks
     * @param entry
     * @return {Array}
     */
    getUserTasks(entry) {
        const self = this;
        let userTasks = _.filter(entry.data, (item) => self.isUserTask(item.type));
        return userTasks || [];
    }

    /**
     * Get the stepProperties of a step
     * @param process
     * @param stepId
     */
    getStepProperties(process, stepId) {
        const self = this;
        let stepsProperties = self.getStepsProperties(process);
        let step = _.find(stepsProperties, (item) => item.id === stepId);
        return step;
    }

    /**
     * Gets the stepProperty array of each step
     * @param process
     * @return {Object|*}
     */
    getStepsProperties(process) {
        return process.getProperty('stepsProperties');
    }

    /**
     * Get the info data of a process
     * @param process
     * @return {Object|*}
     */
    getInfo(process) {
        return process.getProperty('info');
    }

    /**
     * Get the InitParams of a process
     * @param process
     * @return {Object|*}
     */
    getInitParams(process) {
        return process.getProperty('initParams');
    }

    /**
     * Set the InitParams to used
     * @param process
     * @return {Object|*}
     */
    setInitParamsUsed(process, initParams) {
        initParams.initParamsUsed = true;
        return process.setProperty('initParams', initParams);
    }
}

let process = new Process();

module.exports = process;
