const _ = require('lodash');
const HD = require('@docbrasil/hd').utils;
const Domains = require('@docbrasil/hd').domains;
const Mongoose = require('mongoose');
const Behaviours = require('@docbrasil/hd-behaviours');
const Decorators = require('@docbrasil/hd-decorators');
const Async = require('async');
const Boom = require('boom');

let Schema = Mongoose.Schema;
const modelName = "processes_task";

const crudDecorator = { plugin: Decorators.crud,
    options: {
        exposeRoutes: { admin: false, api: false },
        populate: [
            { arrayId: '', field: 'orgId', domain: 'organizations', name: 'organization', types: [ 'get', 'getQuery', 'remove' ], fields: [ '_id','name', 'avatar', 'orgname', 'status' ] },
            { arrayId: '', field: 'userId', domain: 'users', name: 'user', types: [ 'get', 'getQuery' ], fields: [ '_id','avatar', 'name', 'groups' ] },
            { arrayId: '', field: 'ownerId', domain: 'users', name: 'owner', types: [ 'get', 'getQuery' ], fields: [ '_id','avatar','name', 'groups' ] },
            { arrayId: '', field: 'orgProcessId', domain: 'orgprocesses', name: 'orgprocess', types: [ 'get', 'getQuery' ], fields: [ '_id', 'name', 'description', 'filename', "processParticipantsGroup" ] },
            { arrayId: '', field: 'processId', fieldJoin: 'processId', domain: 'fluence', name: 'process', types: [ 'get', 'getQuery' ], fields: [ 'processId', 'properties' ] }
            // { arrayId: '', field: 'processId', domain: 'processes', name: 'process', types: [ 'get', 'getQuery' ], fields: [ 'processId','history', 'properties' ], getFunc: 'getExecProcess' }
        ]
    }
};

let behaviours = [ ];
let decorators = [ crudDecorator ];

let LocalSchema = new Schema({
    orgId: { type: String, required: true, index: true },
    groupId: { type: String, index: true },
    groupsAssigned: { type: Array },
    userId: { type: String, index: true },
    usersAssigned: { type: Array },
    orgProcessId: { type: String, required: true, index: true },
    processId: { type: String, required: true, index: true },
    taskDone: { type: Boolean, index: true, default: false },
    dueDate: { type: Date, index: true },
    formId: { type: String, index: true },
    context: { },
    flowName: { type: String, required: true, index: true },
    flowId: { type: String, required: true, index: true },
    initData: { type: Object },
    stepProperties: { type: Object }
});

let selectFields = "";

Behaviours.api.addPlugins(LocalSchema, behaviours);
Decorators.api.addPlugins(LocalSchema, decorators);

LocalSchema.statics.claim = function(options, cb) {
    let user = options.user;
    let orgId = user.orgId;
    let taskId = options.params.id;
    let execBPMNProcess;
    let funcs = [];
    let task;

    // check can execute
    funcs.push(function(next) {
        Domains.processes().checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, _id: HD.ObjectID(taskId), taskDone: false }).lean().exec(function(err, retTask) {
            if(!err && retTask != null) {
                task = retTask;
                next();
            } else {
                next(Boom.badRequest('Não foi possísel obter a tarefa.'));
            }
        })
    });

    // check if can claim
    funcs.push(function(next) {
        if(user.groups && user.groups.indexOf(task.groupId) !== -1) {
            next();
        } else {
            next(Boom.forbidden('Não autorizado'));
        }
    });

    // claim the task
    funcs.push(function(next) {
        let cond = { orgId: orgId, _id: HD.ObjectID(taskId)};
        let userId = user._id.toString();
        let updData =  {
            $push: { groupsAssigned: { id: task.groupId, userId: userId, date: new Date() } },
            groupId: '',
            userId: userId
        };

        Domains.processes_task().dcrud.findOneAndUpdate(cond, updData, { new: true }).lean().exec(function(err, retTask) {
            next(err)
        })
    });

    // get the process to update the info
    funcs.push(function(next) {
        Domains.processes().getExecProcess(task.processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // save the new data
    funcs.push(function(next) {

        if(_.isUndefined(execBPMNProcess)) {
            next(Boom.badRequest('Não foi possísel obter a tarefa.'));
            return;
        }

        try {
            // add the taskClaim history
            let entryData = {
                taskId: taskId,
                type: 'taskClaim',
                data: {
                    userId: user._id.toString(),
                    userName: user.name,
                    orgId
                }
            };

            execBPMNProcess.addHistoryEntryData(task.flowId, entryData);

            // add the new userTask task (based on the last groupTask that must exist, since we are claiming it)
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let data = entry.data;
            let entryTasks = _.filter(data, (item) => item.type === 'groupTask' );
            if(entryTasks.length >= 1) {
                let entryTask = _.clone(entryTasks[entryTasks.length - 1]);
                entryTask.type = 'userTask';
                entryTask.data.userId = user._id.toString();
                entryTask.data.userName = user.name;
                execBPMNProcess.addHistoryEntryData(task.flowId, entryTask);
            }
            next();
        } catch(ex) {
            next(ex);
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist((err) => {
            next(err);
        });

    });

    Async.series(funcs, function(err) {
        cb(err, { success: err ? false : true });
    });
}

LocalSchema.statics.unclaim = function(options, cb) {
    let user = options.user;
    let orgId = user.orgId;
    let taskId = options.params.id;
    let funcs = [];
    let groupToAssign;
    let task;
    let execBPMNProcess;

    // check can execute
    funcs.push(function(next) {
        Domains.processes().checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, _id: HD.ObjectID(taskId), taskDone: false }).lean().exec(function(err, retTask) {
            if(!err && retTask != null) {
                task = retTask;
                if(task.groupsAssigned && task.groupsAssigned.length > 0) {
                    groupToAssign = task.groupsAssigned[task.groupsAssigned.length - 1].id;
                    next();
                } else {
                    next(Boom.badRequest('Não foi possísel liberar a tarefa.'));
                }
            } else {
                next(Boom.badRequest('Não foi possísel liberar a tarefa.'));
            }
        });
    });

    // unclaim the task
    funcs.push(function(next) {
        let cond = { orgId: orgId, _id: HD.ObjectID(taskId)};
        let userId = user._id.toString();
        let updData =  {
            groupId: groupToAssign,
            $push: { usersAssigned: { id: userId, userId: userId, date: new Date() } },
            userId: ''
        };
        Domains.processes_task().dcrud.findOneAndUpdate(cond, updData, { new: true }).lean().exec(function(err, retTask) {
            next(err)
        })
    });

    // get the process to update the info
    funcs.push(function(next) {
        Domains.processes().getExecProcess(task.processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // save the new data
    funcs.push(function(next) {
        try {
            let entryData = {
                taskId: taskId,
                type: 'taskUnclaim',
                data: {
                    groupName: groupToAssign,
                    groupId: groupToAssign,
                    orgId
                }
            };

            execBPMNProcess.addHistoryEntryData(task.flowId, entryData);

            // add the new groupTask task (based on the last userTask that must exist, since we are unclaiming it)
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let data = entry.data;
            let entryTasks = _.filter(data, (item) => item.type === 'userTask' );
            if(entryTasks.length >= 1) {
                let entryTask = _.clone(entryTasks[entryTasks.length - 1]);
                entryTask.type = 'groupTask';
                delete entryTask.data.userId;
                delete entryTask.data.userName;
                execBPMNProcess.addHistoryEntryData(task.flowId, entryTask);
            }
            next();
        } catch(ex) {
            next(HD.errors.unauthorizedAction);
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist((err) => {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, { success: err ? false : true });
    });
}

LocalSchema.statics.escalate = function(options, cb) {
    let user = options.user;
    let userId = user._id.toString();
    let orgId = user.orgId;
    let taskId = options.params.id;
    let funcs = [];
    let task;
    let orgChart;
    let escalateUserId = '';
    let escalateUserName = '';
    let execBPMNProcess;

    // check can execute
    funcs.push(function(next) {
        Domains.processes().checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, _id: HD.ObjectID(taskId), taskDone: false }).lean().exec(function(err, retTask) {
            if(!err && retTask != null) {
                task = retTask;
                // we can only escalate if the task belong to the logged user and there is actually an assigned user
                if(task.userId === '' || _.isUndefined(task.userId) || task.userId !== userId)
                    next(Boom.badRequest('Não foi possísel escalar a tarefa.'));
                else
                    next();
            } else {
                next(Boom.badRequest('Não foi possísel escalar a tarefa.'));
            }
        })
    });

    // get the superior in the orgchart (the boss of the group)
    funcs.push(function(next) {
        Domains.orgchart().dcrud.findOne({ orgId: orgId, status: Domains.orgchart().status.PUBLISHED }).lean().exec(function(err, retOrgChart) {
            if(!err && retOrgChart != null) {
                let groupId = '';
                if(task.groupId !== '')
                    groupId = task.groupId;
                else if(task.groupsAssigned && task.groupsAssigned.length > 0) {
                    groupId = task.groupsAssigned[task.groupsAssigned.length - 1].id;
                }
                let orgChartItem = _.find(retOrgChart.chart.flat, function(item) { return item.text === groupId; });
                if(orgChartItem) {
                    // get the boss
                    if(orgChartItem.data && orgChartItem.data.users) {
                        let boss = _.find(orgChartItem.data.users, function(item) { return item.isBoss; });
                        if(boss) {
                            escalateUserId = boss.user._id;
                            escalateUserName = boss.user.name;
                            orgChart = retOrgChart;
                        }
                    }

                    if(escalateUserId === '' || escalateUserId === userId) {
                        next(HD.errors.cannotEscalate);
                    } else {
                        next();
                    }
                } else {
                    next(Boom.forbidden('Não autorizado'));
                }
            } else {
                next(Boom.forbidden('Não autorizado'));
            }
        });
    });

    // escalate the task
    funcs.push(function(next) {
        let cond = { orgId: orgId, _id: HD.ObjectID(taskId)};
        let userId = user._id.toString();
        let updData =  {
            $push: { usersAssigned: { id: task.userId, userId: userId, date: new Date() } },
            userId: escalateUserId
        };

        Domains.processes_task().dcrud.findOneAndUpdate(cond, updData, { new: true }).lean().exec(function(err, retTask) {
            next(err)
        })
    });

    // get the process to update the info
    funcs.push(function(next) {
        Domains.processes().getExecProcess(task.processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // save the new data
    funcs.push(function(next) {
        try {
            let entryData = {
                taskId: taskId,
                type: 'taskEscalate',
                data: {
                    userId: escalateUserId.toString(),
                    userName: escalateUserName,
                    orgId
                }
            };

            execBPMNProcess.addHistoryEntryData(task.flowId, entryData);

            // add the new userTask task (based on the last userTask that must exist, since we are escalating it)
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let data = entry.data;
            let entryTasks = _.filter(data, (item) => item.type === 'userTask' );
            if(entryTasks.length >= 1) {
                let entryTask = _.clone(entryTasks[entryTasks.length - 1]);
                entryTask.type = 'userTask';
                entryTask.data.userId = escalateUserId.toString();
                entryTask.data.userName = escalateUserName;
                execBPMNProcess.addHistoryEntryData(task.flowId, entryTask);
            }

            next();
        } catch(ex) {
            next(Boom.forbidden('Não autorizado'));
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist((err) => {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, { success: err ? false : true });
    });
}

LocalSchema.statics.assign = function(options, cb) {
    let user = options.user;
    let userId = user._id.toString();
    let orgId = user.orgId;
    let taskId = options.params.id;
    let funcs = [];
    let task;
    let assignUserId = options.params.userId;
    let assignedUser;
    let execBPMNProcess;

    // check can execute
    funcs.push(function(next) {
        Domains.processes().checkProcessStatus(options.request, orgId, function(err) {
            next(err);
        });
    });

    // get the task
    funcs.push(function(next) {
        Domains.processes_task().dcrud.findOne({ orgId: orgId, _id: HD.ObjectID(taskId), taskDone: false }).lean().exec(function(err, retTask) {
            if(!err && retTask != null) {
                task = retTask;
                // we can only escalate if the task belong to the logged user and there is actually an assigned user
                if(task.userId === '' || _.isUndefined(task.userId) || task.userId !== userId)
                    next(Boom.forbidden('Não autorizado'));
                else
                    next();
            } else {
                next(Boom.forbidden('Não autorizado'));
            }
        })
    });

    // assign the task
    funcs.push(function(next) {
        let cond = { orgId: orgId, _id: HD.ObjectID(taskId)};
        let userId = user._id.toString();
        let updData =  {
            $push: { usersAssigned: { id: task.userId, userId: userId, date: new Date() } },
            userId: assignUserId
        };

        Domains.processes_task().dcrud.findOneAndUpdate(cond, updData, { new: true }).lean().exec(function(err, retTask) {
            next(err)
        })
    });

    // get the process to update the info
    funcs.push(function(next) {
        Domains.processes().getExecProcess(task.processId, function(err, retExecProcess) {
            if(!err && retExecProcess != null) {
                execBPMNProcess = retExecProcess;
            }
            next(err);
        });
    });

    // Get the assignUserId
    funcs.push(function(next) {
        Domains.users().dcrud.findById(assignUserId).select({ name: 1 }).lean().exec(function(err, retAssignedUser) {
            if(!err && retAssignedUser != null) {
                assignedUser = retAssignedUser;
            }
            next(err);
        });
    });

    // save the new data
    funcs.push(function(next) {
        try {
            let entryData = {
                taskId: taskId,
                type: 'taskAssign',
                data: {
                    userId: assignedUser._id.toString(),
                    userName: assignedUser.name,
                    orgId
                }
            };

            execBPMNProcess.addHistoryEntryData(task.flowId, entryData);

            // add the new userTask task (based on the last userTask that must exist, since we are assigning it)
            let entry = execBPMNProcess.getHistoryEntry(task.flowId);
            let data = entry.data;
            let entryTasks = _.filter(data, (item) => item.type === 'userTask' );
            if(entryTasks.length >= 1) {
                let entryTask = _.clone(entryTasks[entryTasks.length - 1]);
                entryTask.type = 'userTask';
                entryTask.data.userId = assignedUser._id.toString();
                entryTask.data.userName = assignedUser.name;
                execBPMNProcess.addHistoryEntryData(task.flowId, entryTask);
            }

            execBPMNProcess.addParticipant(assignedUser._id.toString());
            next();
        } catch(ex) {
            next(Boom.badData('Não foi possível repassar a tarefa.'));
        }
    });

    funcs.push(function(next) {
        execBPMNProcess.persist((err) => {
            next(err);
        });
    });

    Async.series(funcs, function(err) {
        cb(err, { success: err ? false : true });
    });
}

LocalSchema.statics.getTaskDetails = function(tasks, cb) {
    _.each(tasks, task => {
        let detailItems = [];
        let processDetailFields = _.get(task, 'orgprocess.processDetailFields');
        if(processDetailFields) {
            let _addDetailData = function(label, value) {
                if(_.isArray(value)) {
                    value = HD.format.list(value);
                }
                detailItems.push({label: HD.check.string(label, '[Sem Título]'), value: HD.check.string(value)});
            }

            let _getStepData = function(flowName, taskSteps) {
                return  _.find(taskSteps, function(item) { return item.flowName === flowName; });
            }

            let _getFieldData = function(propName, taskSteps) {
                if(HD.check.string(propName) !== '' && _.isFunction(propName.split)) {
                    var aSplit = propName.split('.');
                    if(aSplit.length >= 2) {
                        var step = aSplit[0];
                        var group = aSplit[1];
                        var attribute = aSplit.length >= 2 ? aSplit[2] : '';
                        var stepData = _getStepData(step, taskSteps);

                        if (stepData) {
                            if(group === 'selectedDocuments') {
                                var dataValues = [];
                                _.each(stepData.selectedDocs, function(doc, key) {
                                    dataValues.push({ label: 'Documento ' + (key + 1) + ' - Num.', value: doc.docId});
                                    dataValues.push({ label: 'Documento ' + (key + 1) + ' - Nome.', value: doc.name});
                                    dataValues.push({ label: 'Documento ' + (key + 1) + ' - Autor.', value: doc.author});
                                });
                                return dataValues;
                            } else if(group === 'selectedAssignees') {
                                var dataValues = [];
                                if(!_.isEmpty(stepData.selectedAssignees)) {
                                    var selectedAssignee = stepData.selectedAssignees[0];
                                    dataValues.push({ label: 'Tramitado para', value: selectedAssignee.name});
                                }
                                return dataValues;
                            } else if(group === 'userName') {
                                var dataValues = [];
                                dataValues.push({ label: 'Usuário (' + stepData.flowName + ')', value: stepData.userName});
                                return dataValues;
                            }  else {
                                if(stepData.formData) {
                                    var groupData = _.find(stepData.formData, function(item) { return item.name === group; });
                                    if (groupData) {
                                        var formField = _.find(groupData.fields, function(item) { return item.name.trim() === attribute.trim(); });
                                        if (formField) {
                                            return _getValueFromField(formField);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let _getValueFromField = function(formField) {
                var dataValues = [];
                try {
                    if (formField.type === 'duedate') {
                        dataValues.push({ label: formField.label + ' Prazo', value: formField.dueDate});
                        dataValues.push({ label: formField.label + ' Prioridade', value: formField.priority});
                    } else if (formField.type === 'select' || formField.type === 'list') {
                        if(formField.text === null) {
                            formField.text = formField.value;
                        }
                        dataValues.push({ label: formField.label, value: formField.text});
                    } else if (formField.type === 'date') {
                        var date = HD.check.date(formField.value, null, formField.format);
                        dataValues.push({ label: formField.label, value: date});
                    } else if (formField.type === 'currency') {
                        var money = HD.check.currency(formField.value);
                        dataValues.push({ label: formField.label, value: money});
                    } else {
                        var value = formField.value || '';
                        dataValues.push({ label: formField.label, value: value});
                    }
                } catch (ex) {
                    var value = formField.value || '';
                    dataValues.push({ label: formField.label, value: value});
                }
                return dataValues;
            }

            stepsProperties = _.get(task, 'process.properties.stepsProperties');
            if (stepsProperties) {
                var taskSteps = _.filter(stepsProperties, function (item) {
                    return item.type === 'bpmn:UserTask' || item.type === 'bpmn:Task' || item.type === 'bpmn:StartEvent';
                });
                _.each(processDetailFields, function(field) {
                    var dataValues = _getFieldData(field, taskSteps);
                    _.each(dataValues, function(data) {
                        _addDetailData(data.label, data.value);
                    });
                });
            }
        }
        task.detailItems = detailItems;
        delete task.process.stepsProperties;
    });
}

LocalSchema.statics.searchTasks = function(options, cb) {
    let user = options.user ? options.user : HD.getUser(options.request);

    if(user === null || _.isUndefined(user)) {
        return cb(null, []);
    }

    let orgId = user.orgId;
    let userId = user._id.toString();
    let funcs = [];
    let tasks = [];
    let searchOpts = {
        payload: { orgId, userId },
        query: {},
        project: {
            flowName: 1,
            groupsAssigned: 1,
            created: 1,
            dueDate: 1,
            taskDone: 1,
            userId: 1,
            processId: 1,
            'stepProperties.priority': 1,
            orgProcessId: 1,
            'process.properties.info.protocol': 1,
            'process.properties.stepsProperties': 1
        },
        lookup: [
            {
                from: "fluences",
                localField: "processId",
                foreignField: "processId",
                as: "process"
            }
        ],
        projectJoin: {
            orgprocess: {
                name: 1,
                description: 1,
                processDetailFields: 1
            },
            user: {
                name: 1,
                groups: 1
            }
        }
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

    funcs.push((next) => {

        Domains.processes_task().getQuery(searchOpts, function(err, retData) {
            if(!err && retData !== null) {
                tasks = retData;
            }
            next();
        });
    });

    funcs.push((next) => {
        model.getTaskDetails(tasks.items);
        next();
    });

    Async.series(funcs, (err) => {
        cb(err, tasks);
    });
}

LocalSchema.statics.searchTasksToClaim = function(options, cb) {
    let user = options.user ? options.user : HD.getUser(options.request);

    if(user === null || _.isUndefined(user)) {
        return cb(null, []);
    }

    let orgId = user.orgId;
    let funcs = [];
    let tasks = [];
    let searchOpts = {
        payload: {
            orgId,
            groupId: { $in: user.groups },
            taskDone: false,
            sort: { dueDate: 1, _id: 1 }
        },
        query: {},
        lookup: [
            {
                from: "fluences",
                localField: "processId",
                foreignField: "processId",
                as: "process"
            }
        ],
        project: {
            flowName: 1,
            groupsAssigned: 1,
            created: 1,
            dueDate: 1,
            taskDone: 1,
            userId: 1,
            processId: 1,
            'stepProperties.priority': 1,
            orgProcessId: 1,
            'process.properties.info.protocol': 1,
            'process.properties.stepsProperties': 1
        },
        projectJoin: {
            orgprocess: {
                name: 1,
                description: 1,
                processDetailFields: 1
            },
            user: {
                name: 1,
                groups: 1
            }
        }
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

    funcs.push((next) => {

        Domains.processes_task().getQuery(searchOpts, function(err, retData) {
            if(!err && retData !== null) {
                tasks = retData;
            }
            next();
        });
    });

    funcs.push((next) => {
        model.getTaskDetails(tasks.items);
        next();
    });

    Async.series(funcs, (err) => {
        cb(err, tasks);
    });
}

let model = Mongoose.model(modelName, LocalSchema);

let domain =  {
    selectFields: selectFields,
    claim: model.claim,
    unclaim: model.unclaim,
    escalate: model.escalate,
    searchTasks: model.searchTasks,
    searchTasksToClaim: model.searchTasksToClaim,
    assign: model.assign
};

Behaviours.api.prepareModel(domain, model, behaviours);
Decorators.api.prepareModel(domain, model, decorators);

module.exports = domain;
