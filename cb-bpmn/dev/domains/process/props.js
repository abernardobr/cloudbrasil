const _ = require('lodash');
const HD = require('@docbrasil/hd').utils;
const Domains = require('@docbrasil/hd').domains;
const Process = require('@docbrasil/hd').process.process();

class Props {
    constructor(options) {
        const self = this;
        self.process = options.process;
        self.currentStepId = options.currentStepId;
        // process data
        self.data = self.process.getProperty('data') || {};
        self.info = self.process.getProperty('info') || {};

        // get the previous process data (finished or not) for the user that started the process
        self.previousProcess = null;
    }

    _handlerName(name) {
        let cleanName = name.replace(/[:!`~\^@*#¢¬ç?¦\|&;%@"<>\(\){}\[\]\+, \t\n]/g, "_");

        if (cleanName.match(/^[0-9]/)) {
            cleanName = "_" + cleanName;
        }
        return cleanName;
    }

    _getCurrentStepData(process) {
        const self = this;
        return self._getStepData(process, self.currentStepId);
    }

    _isTaskType(type) {
        return Domains.processes().isUserTask(type);
    }

    _getStepHistoryEntries(process, step) {
        let historyEntries = process.getHistoryEntries();
        let flowHistories = _.filter(historyEntries, (item) => item.name === step);

        // get the history together with all the flows that that have looped into history
        let flowData = [];
        _.each(flowHistories, (flow) => {
            flowData = _.union(flowData, flow.data);
        });
        return { data: flowData };
    }

    _getPreviousUserTaskStepData(process) {
        const self = this;
        let userEntries =  _.filter(process.getHistoryEntries(), (item) => self._isTaskType(item.type));
        if(userEntries.length >= 2) {
            let entry = userEntries[userEntries.length - 2];
            // now get the last data entry for tis userEntry
            if(!_.isEmpty(entry.data)) {
                let lastDataEntry = entry.data[entry.data.length - 1];
                if (lastDataEntry && lastDataEntry.data && lastDataEntry.data.formData) {
                    return lastDataEntry.data;
                }
            }

        }
        return {};
    }

    _getStepData(process, step) {
        const self = this;
        let currentStepData = self._getStepHistoryEntries(process, step);
        if(currentStepData && _.isArray(currentStepData.data)) {
            let userTaskHistories = _.filter(currentStepData.data, (item) => self._isTaskType(item.type));
            // There could be several history for step (adhoc)
            let entry = userTaskHistories[userTaskHistories.length - 1];
            if(entry && entry.data && entry.data.formData) {
                return entry.data;
            }
        }
        return {};
    }

    getValueFromField(formField) {
        try {
            if (formField.type === 'duedate') {
                return {
                    def: formField.value,
                    value: formField.value,
                    dueData: formField.dueDate,
                    priority: formField.priority
                };
            } else if (formField.type === 'select' || formField.type === 'list') {
                return {def: formField.value, value: formField.value, text: formField.text};
            } else if (formField.type === 'date') {
                let date = formField.value;
                return {value: date, def: date};
            } else if (formField.type === 'currency') {
                let money = formField.value;
                return {value: money, def: money};
            } else {
                let value = formField.value || '';
                return {value, def: value};
            }
        } catch (ex) {
            let value = formField.value || '';
            return {value, def: value};
        }
    }

    /**
     * Gets the previous process to be able to get previous process data
     * It is always related to the same user that created the process
     * @param cb
     */
    getPreviousProcess(cb) {
        const self = this;
        let processDefinition = self.process.getProcessDefinition();
        let options = {
            processName: processDefinition.name,
            userId: self.info.userId,
            orgId: self.info.orgId
        };
        Domains.processes().getPreviousProcess(options, (err, retPrevProcess) => {
            if(!err && retPrevProcess !== null) {
                Domains.processes().getBPMNProcess(retPrevProcess.processId, (err, retBPMNPrevProcess) => {
                    if(!err && retBPMNPrevProcess !== null) {
                        self.previousProcess = retBPMNPrevProcess;
                    }
                    cb(err);
                });
            } else {
                cb(err);
            }
        });
    }

    /**
     * Get the property value of a field value of a property in form data
     * @param propName
     *  - format is:
     *      currentStep.group name.field name
     *      step.group name.field name
     *      step.selectedDocs
     *      step.selectedAssignees
     * @return field value
     */
    get(propName) {
        const self = this;
        let fieldValue = self.getFieldValue(propName);
        if(_.isObject(fieldValue) && fieldValue.value) {
            return fieldValue.value;
        }
        return null;
    }

    /**
     * Get the property field value of a property in form data
     * @param propName
     *  - format is:
     *      (previousProcess)currentStep.group name.field name
     *          - (previousProcess): (optional) the previous process of this user
     *      step.group name.field name
     *      step.selectedDocs
     *      step.selectedAssignees
     *      process.<process property> --> Valid ones: 'processName', 'processDescription', 'userGroups', 'userName', 'protocol', 'timezone'
     * @return field value in object (value, def)
     */
    getFieldValue(propName) {
        const self = this;
        if(HD.check.string(propName) !== '' && _.isFunction(propName.split)) {
            let aSplit = propName.split('.');
            if(aSplit.length >= 2) {
                let step = aSplit[0];
                let group = aSplit[1];
                let attribute = aSplit.length >= 2 ? aSplit[2] : '';
                let stepData;

                let process = self.process;
                // (previousProcess)Grupo
                // check if we want from the previsou process or current process
                if(step.indexOf('(previousProcess)') !== -1) {
                    step = step.replace('(previousProcess)', '');
                    process = self.previousProcess;
                }

                // if we have a process to get data from
                if(process === null || _.isUndefined(process)) {
                    return;
                }

                // Get the step data
                if (step === 'currentStep') {
                    stepData = self._getCurrentStepData(process);
                } else if (step === 'previousStep') {
                    stepData = self._getPreviousUserTaskStepData(process);
                } else if(step === 'process') {
                    let allowedItems = ['processName', 'processDescription', 'userGroups', 'userName', 'protocol', 'timezone'];
                    if(allowedItems.indexOf(group) !== -1) {
                        let value = _.get(self.info, group);
                        if(_.isArray(value)) {
                            value = Process.utils.format.list(value);
                        }
                        return { value };
                    }
                } else if(step === 'processUserGroup') {
                    return { value: stepData.userName };
                } else {
                    stepData = self._getStepData(process, step);
                }

                if (stepData) {
                    if(group === 'selectedDocuments') {
                        return { value: stepData.selectedDocs || [] };
                    } else if(group === 'selectedAssignees') {
                        return { value: stepData.selectedAssignees || [] };
                    } else if(group === 'userName') {
                        return { value: stepData.userName };
                    } else {
                        if(stepData.formData) {
                            let groupData = _.find(stepData.formData, (item) => item.name === group);
                            if (groupData) {
                                let formField = _.find(groupData.fields, (item) => item.name.trim() === attribute.trim());
                                if (formField) {
                                    return self.getValueFromField(formField);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Set the property value of a field value of a property in form data
     * @param propName
     *  - format is:
     *      currentStep.group name.field name
     *          - (previousProcess): do NOT accept. It will not do anything
     *      step.group name.field name
     *      step.selectedDocs
     *          - Array of all the docs (it will not add, it will substitute)
     *      step.selectedAssignees
     *          - Array of all the assignees (it will not add, it will substitute)
     * @param value
     *  - a value to be added to the property:
     *      Single value: It can be just a value
     *      Object: it will be merged by keys
     *      Array: it will be set as the value
     */
    set(propName, value) {
        const self = this;
        if(HD.check.string(propName) !== '') {
            let aSplit = propName.split('.');
            if(aSplit.length >= 2) {
                let step = aSplit[0];
                let group = aSplit[1];
                let attribute = aSplit.length >= 2 ? aSplit[2] : '';
                let stepData;

                let process = self.process;
                // (previousProcess)Grupo
                // Do NOT set any data if it is marked as previousProcess, since it is not allowed to
                // change values in one process, from another non-collaborating process
                if(step.indexOf('(previousProcess)') !== -1) {
                    return;
                }

                // if we have a process to get data from
                if(process === null) {
                    return;
                }

                // Get the step data
                if (step === 'currentStep') {
                    stepData = self._getCurrentStepData(process);
                } else if (step === 'previousStep') {
                    stepData = self._getPreviousUserTaskStepData(process);
                } else {
                    stepData = self._getStepData(process, step);
                }

                if (stepData) {
                    if(group === 'selectedDocuments') {
                        if(_.isArray(value)) {
                            stepData.selectedDocs = value;
                        }
                    } else if(group === 'selectedAssignees') {
                        if(_.isArray(value)) {
                            stepData.selectedAssignees = value;
                        }
                    } else {
                        // TODO: should we create history?
                        // Change the history formData
                        if(stepData.formData) {
                            let groupData = _.find(stepData.formData, (item) => item.name === group);
                            if (groupData) {
                                let formField = _.find(groupData.fields, (item) => item.name.trim() === attribute.trim());
                                if (formField) {
                                    if(_.isObject(value)) {
                                        formField = _.defaultsDeep({}, value, formField);
                                    } else {
                                        formField.value = value;
                                    }
                                }
                            }
                        }
                        // Need to to change now the formData in stepProperties
                        let stepsProperties = process.getProperty('stepsProperties');
                        if(stepsProperties) {
                            stepData = _.find(stepsProperties, (item) => item.flowName === step);
                            if(stepData) {
                                let groupData = _.find(stepData.formData, (item) => item.name === group);
                                if (groupData) {
                                    let formField = _.find(groupData.fields, (item) => item.name.trim() === attribute.trim());
                                    if (formField) {
                                        if (_.isObject(value)) {
                                            formField = _.defaultsDeep({}, value, formField);
                                        } else {
                                            formField.value = value;
                                        }
                                    }
                                }
                            }
                        }

                    }
                    process.persist();
                }
            }
        }
    }
}

module.exports = Props;
