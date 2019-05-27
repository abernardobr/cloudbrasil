const _ = require('lodash');
const HD = require('@docbrasil/hd').utils;
const Domains = require('@docbrasil/hd').domains;
const Props = require('@docbrasil/hd').process.props();
const Process = require('@docbrasil/hd').process.process();
const Moment = require('moment');
const Async = require('async');
const Boom = require('boom');

class Task {
    constructor(options) {
        const self = this;
        self.process = options.process;
        self.processInfo = Process.getInfo(self.process);
        self.orgId = options.orgId || self.processInfo.orgId;
        self.stepId = options.stepId;
        self.stepProperties = options.stepProperties || Process.getStepProperties(self.process, options.stepId);
        self.initParams = options.initParams || Process.getInitParams(self.process);
        if(_.isEmpty(self.initParams)) {
            self.initParams = {}
        }
        self.contextList = {
            OPEN_SEARCH: {domain: 'documents', func: 'search'},
            SEARCH_DOC_WAREHOUSE: {domain: 'documents', func: 'searchDocWarehouse'},
            SEARCH_DOC_IN_CLIENT: {domain: 'documents', func: 'searchDocOnClient'}
        };
        self.formData = [];
        self.props = new Props({
            process: self.process,
            currentStepId: self.stepProperties.id
        });
    }

    _getLastUserTaskFromEntry(entry) {
        const self = this;
        return entry ? self._getLastUserTask(self._getUserTasks(entry)) : [];
    }

    _getLastUserTask(userTasks) {
        let lastTask = userTasks[userTasks.length - 1];
        return lastTask || {};
    }

    _getUserTasks(entry) {
        let userTasks = entry ? _.filter(entry.data, (item) => Domains.processes().isUserTask(item.type)) : [];
        return userTasks || [];
    }

    _getDefaultValues(field) {
        const self = this;
        let value = '';
        if(_.isUndefined(field)) {
            return value;
        }
        let def = HD.check.string(field.def);
        if(def !== '' && def[0] === '#') {
            let propName = def.slice(1);
            // we need to define if we have user.name or user.email as default. if we do, then we''l use the values
            // of user.name and user.email when we open the form to do a task and get it as default
            if(propName === 'user.name' || propName === 'user.email') {
                value = def;
            } else {
                value = self.props.get(propName);
            }
        } else if(HD.check.string(field.def) !== '' && field.def[0] === '$') {
            let today = new Date();
            if(def === '$time') {
                // put the current time
                value = today;
            } else if(def === '$today') {
                // put the current date
                value = today;
            } else if(def === '$now') {
                // put the current date and time
                value = today;
            }
        } else {
            value = def;
        }
        return value;
    }

    /**
     * Gets the value of each field on the groups. These are the steps:
     *  - Apply formGroup defaults to values to new formData
     *  - Apply formData to group if we need to keepValue
     * @private
     */
    _setFormPropertyDefaults() {
        const self = this;
        const formGroup = self.stepProperties.formGroups;
        self.formData = _.clone(formGroup);       // initialize the formData
        _.each(self.formData, (group, keyGroup) => {
            _.each(group.fields, (field, keyField) => {
                // Apply defaults from formGroup
                // a default value is NOT database ready, to we call get to tranform the default value to database value
                var value = self._getDefaultValues(field) || '';
                field.value = value;
                // maintain the value if we need too
                // check if we have a history
                if(!_.isEmpty(self.stepProperties.formData)) {
                    // we keep the value from the previous history
                    if (field.keepValue) {
                        let formDataValue = self.stepProperties.formData[keyGroup].fields[keyField].value;
                        if (!_.isUndefined(formDataValue)) {
                            field.value = formDataValue;
                        }
                    }
                }

                self.formData[keyGroup].fields[keyField] = field;
            });
        });

        // Get the selected documents default properties
        let stepProperties = self.stepProperties;
        if(stepProperties.defaultSelectedDocs !== '' && stepProperties.defaultSelectedDocs.charAt(0) === '#') {
            let entryName = stepProperties.defaultSelectedDocs.slice(1);
            if(entryName !== '') {
                self.stepProperties.selectedDocs = self.props.get(entryName) || [];
            }
        }
    }

    /**
     * Sets the form data into the stepsProperties
     * @private
     */
    _setFormData() {
        const self = this;
        self.stepProperties.formData = self.formData;
    }

    /**
     * Sets the form data into the stepsProperties
     * @private
     */
    _setInitProperties() {
        const self = this;
        if(!self.initParams.initParamsUsed) {
            if(self.initParams.selectedDocs) {
                self.stepProperties.selectedDocs = self.initParams.selectedDocs;
            }
            if(self.initParams.selectedAssignees) {
                self.stepProperties.selectedAssignees = self.initParams.selectedAssignees;
            }
            Process.setInitParamsUsed(self.process, self.initParams);
        }
    }

    _createUserTask(userId, cb) {
        const self = this;

        if(_.isFunction(userId)) {
            cb = userId;
            userId = '';
        }

        let options = {
            process: self.process,
            context: self.contextList[self.stepProperties.formContext],
            formId: 'adhoctramitar',
            flowId: self.stepProperties.boId,
            flowName: self.stepProperties.flowName,
            stepProperties: self.stepProperties,
            formData: self.formData,
            initData: {}
        };

        if(_.isString(userId) && userId !== '') {
            options.userId = userId;
        }

        self._addUserTask(options, (err, retTaskOwnerId, taskId) => {
            cb(err, retTaskOwnerId, taskId);
        });
    }

    _getGroupName(groupToCreateTask) {
        const self = this;
        if(groupToCreateTask[0] === '#') {
            groupToCreateTask = self.props.get(groupToCreateTask.slice(1));
        }
        return groupToCreateTask;
    }

    _createGroupTask(cb) {
        const self = this;
        let stepProperties = self.stepProperties;
        let groupToCreateTask = self._getGroupName(self.stepProperties.groupToCreateTask);
        let options = {
            process: self.process,
            groupId: groupToCreateTask,
            groupName: groupToCreateTask,
            context: self.contextList[self.stepProperties.formContext],
            formId: 'adhoctramitar',
            flowId: self.stepProperties.boId,
            flowName: self.stepProperties.flowName,
            formData: self.formData,
            stepProperties,
            initData: {}
        };

        self._addGroupTask(options, (err, taskId) => {
            cb(err, groupToCreateTask, taskId);
        });
    }

    _calculateDueDate(dueDate, fieldDueDate) {
        const self = this;
        if(_.isUndefined(dueDate) || dueDate === '') {
            return;
        }

        if(_.isDate(dueDate)) {
            return dueDate;
        }

        let seconds = 0;
        if(!_.isUndefined(fieldDueDate) && fieldDueDate !== '') {
            let fieldDueDateValue = self.props.get(fieldDueDate);
            seconds = Moment.duration(fieldDueDateValue).asSeconds();
        }

        if(seconds === 0) {
            seconds = Moment.duration(dueDate).asSeconds();
        }

        return Moment(new Date()).add(seconds, 's');
    }

    /**
     * Send new task user email
     * @param options
     *  - orgProcessId: the organization process that is being executed
     *  - orgId: the id of the organization
     *  - userName: user name
     *  - taskId: task id
     *  - processId: process id
     *  - emailTo: email to send the email to
     * @param cb
     */
    _sendEmailUserTask(options, cb) {
        Domains.orgprocesses().dcrud.findById(options.orgProcessId).select({ sendEmailToUsers: 1 }).lean().exec(function(err, retOrgProcess) {
            if(!err && retOrgProcess !== null && retOrgProcess.sendEmailToUsers) {
                Domains.organizations().dcrud.findById(options.orgId).select({ orgname: 1, name: 1 }).lean().exec(function(err, retOrg) {
                    if(!err && retOrg !== null) {
                        let taskUrl = `/organization/${retOrg.orgname}/task/${options.taskId}/process/${options.processId}`;
                        let data = {
                            orgName: retOrg.name,
                            orgAcronym: retOrg.orgname,
                            userName: options.userName,
                            taskUrl: taskUrl
                        };
                        let emailOptions = {
                            templateName: 'USER_TASK',
                            to: options.emailTo,
                            data: data
                        };
                        Domains.email().sendMail(emailOptions, function() {
                            cb()
                        });
                    } else {
                        cb();
                    }
                });
            } else {
                cb();
            }
        });
    }

    /**
     * Send new task group email: templateName: 'USER_TASK_GROUP'
     * @param options
     * - orgProcessId: execProcess.orgProcessId
     * - orgId: execProcess.orgId
     * - taskId: task._id.toString()
     * - groupId: groupId
     * - processId: processId
     * - groupName: groupName
     * @param cb
     * @private
     */
    _sendEmailGroupTask(options, cb) {
        Domains.orgprocesses().dcrud.findById(options.orgProcessId).select({ sendEmailToGroups: 1 }).lean().exec(function(err, retOrgProcess) {
            if(err || retOrgProcess === null || !retOrgProcess.sendEmailToGroups) {
                cb();
            } else {

                Domains.orgchart().getGroupUsers(options.orgId, options.groupId, function(err, retUsers) {
                    if(err || retUsers === null || retUsers.length === 0) {
                        return cb();
                    }

                    // Now send email to all users in the group
                    let funcs = [];
                    let organization;

                    // Get the organization
                    funcs.push(function(next) {
                        Domains.organizations().dcrud.findById(options.orgId).select({ orgname: 1, name: 1 }).lean().exec(function(err, retOrg) {
                            if(!err && retOrg !== null) {
                                organization = retOrg;
                            }
                            next();
                        });
                    });

                    _.each(retUsers, function(userItem) {
                        if(userItem.user) {
                            funcs.push(function(next) {
                                let data = {
                                    orgName: organization.name,
                                    orgAcronym: organization.orgname,
                                    userName: userItem.user.name,
                                    groupName: options.groupName
                                };
                                let emailOptions = {
                                    templateName: 'USER_TASK_GROUP',
                                    to: userItem.user.email,
                                    data: data
                                };
                                Domains.email().sendMail(emailOptions, function() {
                                    next()
                                });
                            });
                        }
                    });

                    Async.series(funcs, function() {
                        cb();
                    });
                });
            }
        });
    }

    _addUserTask(options, cb) {
        let self = this;
        let funcs = [];
        let processId = self.process.getProcessId();
        let task = null;
        let stepProperties = options.stepProperties || {};
        let dueDate;
        let formId = options.formId;
        let flowId = options.flowId;
        let flowName = options.flowName;
        let context = options.context;
        let userId = options.userId;
        let initData = options.initData;
        let formData = options.formData;
        let user;
        let userName;
        let orgProcessId = self.processInfo.orgProcessId;
        let orgId = self.orgId;
        let taskId;

        // get the user
        funcs.push(function(next) {
            Domains.users().dcrud.findById(userId).select({ name: 1, email: 1 }).lean().exec(function(err, retUser) {
                if(!err && retUser != null) {
                    user = retUser;
                    userName = retUser.name;
                }
                next(err);
            });
        });

        // ensure we do not have any previous opened tasks before we create a new one
        funcs.push((next) => {
            Domains.processes_task().dcrud.update({ processId, orgProcessId, flowId }, { taskDone: true }, { multi: true }, () => {
                next();
            });
        });

        // create the task
        funcs.push(function(next) {

            dueDate = self._calculateDueDate(options.dueDate || stepProperties.stepDueHrs, stepProperties.fieldDueHrs);

            // add task
            let addOptions = {
                payload: {
                    orgId,
                    userId,
                    $push: { usersAssigned: { id: userId, userId: userId, date: new Date() } },
                    orgProcessId,
                    processId,
                    formId,
                    flowId,
                    flowName,
                    initData,
                    stepProperties
                },
                ownerId: HD.ObjectID(userId),
                api: "site"
            };

            if(dueDate) {
                addOptions.payload.dueDate = dueDate;
            }

            if(context) {
                addOptions.payload.context = context;
            }

            Domains.processes_task().add(addOptions, function(err, retTask) {
                if(!err && retTask != null) {
                    task = retTask;
                    taskId = retTask._id.toString()
                }
                next(err);
            });

        });

        // create the fluence history
        funcs.push(function(next) {
            let taskData = {
                taskId,
                type: 'userTask',
                data: {
                    start: new Date(),
                    end: null,
                    flowId,
                    flowName,
                    processId,
                    userId: userId,
                    formId: formId,
                    orgProcessId,
                    orgId,
                    taskId,
                    stepProperties,
                    formData
                }
            };

            if(user && user.name) {
                taskData.data.userId = user._id.toString();
                taskData.data.userName = user.name;
            }

            if(dueDate) {
                taskData.dueDate = dueDate;
            }

            // merge the initData with the taskData data
            taskData.data = _.merge(initData, taskData.data);

            // add the history and persist
            self.process.addHistoryEntryData(flowId, taskData);
            next();
        });

        // Send emails
        funcs.push(function(next) {
            // Send Email that a task has been created.
            let emailOptions = {
                orgProcessId,
                orgId,
                userName: user.name,
                emailTo: user.email,
                taskId,
                processId: processId
            };
            self._sendEmailUserTask(emailOptions, function() {
                next();
            })
        });

        Async.series(funcs, function(err) {
            cb(err, userId, taskId);
        });
    }

    _addGroupTask(options, cb) {
        const self = this;
        let funcs = [];
        let processId = self.process.getProcessId();
        let task = null;
        let stepProperties = options.stepProperties;
        let dueDate;
        let formId = options.formId;
        let flowId = options.flowId;
        let flowName = options.flowName;
        let context = options.context;
        let groupId = options.groupId;
        let groupName = options.groupName;
        let initData = options.initData;
        let formData = options.formData;
        let orgProcessId = self.processInfo.orgProcessId;
        let orgId = self.orgId;
        let taskId;

        // ensure we do not have any previous opened tasks before we create a new one
        funcs.push((next) => {
            Domains.processes_task().dcrud.update({ processId, orgProcessId, flowId }, { taskDone: true }, { multi: true }, () => {
                next();
            });
        });

        // add the task (group)
        funcs.push(function(next) {

            dueDate = self._calculateDueDate(options.dueDate || stepProperties.stepDueHrs, stepProperties.fieldDueHrs);

            // add task
            let addOptions = {
                payload: {
                    orgId,
                    groupId,
                    $push: { groupsAssigned: { id: groupId, date: new Date() } },
                    processId,
                    orgProcessId,
                    formId,
                    flowId,
                    flowName,
                    initData,
                    stepProperties
                },
                api: "site"
            };

            if(dueDate) {
                addOptions.payload.dueDate = dueDate;
            }

            if(context) {
                addOptions.payload.context = context;
            }

            Domains.processes_task().add(addOptions, function(err, retTask) {
                if(!err && retTask != null) {
                    task = retTask;
                    taskId = retTask._id.toString()
                }
                next(err);
            });

        });

        // update the process info
        funcs.push((next) => {
            let taskData = {
                taskId,
                type: 'groupTask',
                data: {
                    flowId,
                    flowName,
                    processId,
                    groupId,
                    groupName,
                    formId,
                    orgProcessId,
                    orgId,
                    taskId,
                    stepProperties,
                    formData
                }
            };

            if(dueDate) {
                taskData.dueDate = dueDate;
            }

            // merge the initData with the taskData data
            taskData.data = _.merge(initData, taskData.data);

            self.process.addHistoryEntryData(flowId, taskData);

            // Send Email that a task has been created.
            let emailOptions = {
                templateName: 'USER_TASK_GROUP',
                orgProcessId,
                orgId,
                taskId,
                groupId,
                processId,
                groupName
            };
            self._sendEmailGroupTask(emailOptions, function() {
                next();
            })
        });

        // Change the history and persist on fluence
        Async.series(funcs, function(err) {
            cb(err, taskId);
        });
    }

    /**
     * Adds a task.
     *  - formGroup: the defaults from the stepProperties for each field
     *  - groups: the actual group data with all field properties that we'll need to build formData
     *  - formData: the actual formData saved (it carry the final data for the step)
     * @param cb
     */
    add(cb) {
        const self = this;
        let funcs = [];
        let participants = [];
        let taskId;

        // get the org forms
        funcs.push((next) => {
            let orgFormId = self.stepProperties.orgFormId;
            if(orgFormId) {
                Domains.orgforms().dcrud.findOne({
                    orgId: self.orgId,
                    _id: HD.ObjectID(orgFormId)
                }).select({groups: 1}).lean().exec((err, retOrgForm) => {
                    if (!err && retOrgForm !== null) {
                        self.orgForm = retOrgForm;
                    }
                    next(err);
                });
            } else {
                next(Boom.badRequest('Não existe um formulário para iniciar essa tarefa!'));
            }
        });

        // set properties to get the last process data from the
        // the same owner of this process
        funcs.push((next) => {
            // set the property defaults
            self.props.getPreviousProcess(() => {
                next();
            });
        });

        funcs.push((next) => {
            // set the property defaults on groups
            self._setFormPropertyDefaults();
            next();
        });

        funcs.push((next) => {
            // set the form data with the default values
            self._setFormData();
            next();
        });

        funcs.push((next) => {
            // Create the task
            let createTaskType = self.stepProperties.createTaskType;
            if(createTaskType === 'Grupo' || createTaskType === 'Grupo Vindo do Processo') {
                self._createGroupTask((err, groupToCreateTask, retTaskId) => {
                    if(!err) {
                        Domains.orgchart().getGroupUsers(self.orgId, groupToCreateTask, (err, retUsers) => {
                            if(!err) {
                                taskId = retTaskId;
                                participants = _.union(participants, _.map(retUsers, (item) => item.user._id));
                            }
                            next(err);
                        });
                    } else {
                        next(err);
                    }
                });
            } else if(createTaskType === 'Usuário Atual') {
                self._createUserTask(self.processInfo.userId, (err, retTaskOwnerId, retTaskId) => {
                    if(!err) {
                        taskId = retTaskId;
                        participants.push(retTaskOwnerId);
                    }
                    next(err);
                });
            } else if(createTaskType === 'Usuário') {
                self._createUserTask(self.stepProperties.userId, (err, retTaskOwnerId, retTaskId) => {
                    if(!err) {
                        taskId = retTaskId;
                        participants.push(self.stepProperties.userId);
                    }
                    next(err);
                });
            } else if(createTaskType === 'Dono do Grupo' || createTaskType === 'Dono do Grupo Vindo do Processo') {
                let groupToCreateTask = self._getGroupName(self.stepProperties.groupToCreateTask);
                Domains.orgchart().getGroupUsers(self.orgId, groupToCreateTask, (err, retUsers) => {
                    let owner = _.find(retUsers, (item) => item.isBoss);
                    if(owner && owner.user && owner.user._id) {
                        self._createUserTask(owner.user._id, (err, retTaskOwnerId, retTaskId) => {
                            if(!err) {
                                taskId = retTaskId;
                                participants.push(owner.user._id);
                            }
                            next(err);
                        });
                    } else {
                        self._createGroupTask((err, groupToCreateTask, retTaskId) => {
                            if(!err) {
                                taskId = retTaskId;
                                participants = _.union(participants, _.map(retUsers, (item) => item.user._id));
                            }
                            next(err);
                        });
                    }
                });
            } else {
                self._createUserTask((err, retTaskOwnerId, retTaskId) => {
                    if(!err) {
                        if(!err) {
                            taskId = retTaskId;
                            participants.push(retTaskOwnerId);
                        }
                    }
                    next();
                });
            }
        });

        // adds participants to the process
        funcs.push((next) => {
            const self = this;
            self.process.addParticipant(participants);
            next();
        });

        // Last but not least, if we have init parameters then set the init parameters at the very end
        // For now only selectedDocs and selectedAssignees
        funcs.push((next) => {
            const self = this;
            self._setInitProperties();
            next();
        });

        // persist the process
        funcs.push((next) => {
            self.process.persist(() => {
                next();
            });
        });


        Async.series(funcs, (err) => {
            cb(err, taskId);
        });
    }

    end(cb) {
        const self = this;
        let processId = self.process.getProcessId();
        Domains.processes_task().dcrud.update({processId}, {taskDone: true}, {multi: true}).exec(err => {
            cb(err);
        });
    }
}

module.exports = Task;
