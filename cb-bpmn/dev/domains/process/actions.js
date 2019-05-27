const _ = require('lodash');
const HD = require('@docbrasil/hd').utils;
const Domains = require('@docbrasil/hd').domains;
const Async = require("async");
const Process = require('@docbrasil/hd').process.process();
const Props = require('@docbrasil/hd').process.props();
const Handlebars = require('handlebars');
const Showdown  = require('showdown');
const Boom = require('boom');

/**
 * Class that defines all the available actions on a document in the system
 * @class
 */
class Documents {
    constructor() {
        const self = this;

        self.status = {
            CREATED: 1,
            IN_REVIEW: 2,       // Aguardando aprovação
            APPROVED: 3,        // Aprovado
            REJECTED: 4,
            BLOCKED: 5,
            UNPUBLISHED: 6,     // Check-out
            CLOSED: 7
        };

        self.storageStatus = {
            CREATED: 'Criado',
            PROCESSING: 'Em Trâmite',
            STORAGE: 'Em Guarda',
            CLIENT: 'No Clinete'
        }
    }

    /**
     * Sets the PhisicalStorage status for a document
     * @param documents
     * @param hasPhisicalStorage
     */
    setPhisicalStorage(documents, hasPhisicalStorage) {
        let funcs = [];

        _.each(documents, (doc) => {
            funcs.push((next) => {
                Domains.documents().dcrud.findByIdAndUpdate(doc.id, { hasPhisicalStorage }).select({ hasPhisicalStorage: 1 }).lean().exec(() => {
                    next();
                });
            });
        });

        Async.parallelLimit(funcs, 5, () => {});
    }

    /**
     * Change the status of documents
     * Example
     *  Actions.documents.changeStatus(Props.get('Minhas Task Linda.selectedDocuments', Actions.documents.status.CREATED));
     *
     * @param documents
     *  The Props.get for documents
     * @param status
     *  Actions.documents.status
     */
    changeStatus(documents, status) {
        let funcs = [];

        _.each(documents, (doc) => {
            funcs.push((next) => {
                Domains.documents().dcrud.findByIdAndUpdate(doc.id, { status }).select({ status: 1 }).lean().exec(() => {
                    next();
                });
            });
        });

        Async.parallelLimit(funcs, 5, () => {});
    }

    /**
     * Change the storage status of documents
     * Example
     *  Actions.documents.changeStorageStatus(Props.get('Minhas Task Linda.selectedDocuments', Actions.documents.storageStatus.CREATED));
     *
     * @param documents
     *  The Props.get for documents
     * @param storageStatus
     *  Actions.documents.storageStatus
     */
    changeStorageStatus(documents, storageStatus) {
        let funcs = [];

        _.each(documents, (doc) => {
            funcs.push((next) => {
                Domains.documents().dcrud.findByIdAndUpdate(doc.id, { storageStatus }).select({ storageStatus: 1 }).lean().exec(() => {
                    next();
                });
            });
        });

        Async.parallelLimit(funcs, 5, () => {});
    }

    /**
     * Find one document from a primnary key. If there is more than one, it returns the first one that finds.
     * @param process: the current process.
     * @param docTypeName: the name of the doc type.
     * @param pk: the primary key object.
     * @param data: will update category, tags and docTypeFieldsData (format like MongoDB query)
     * @param cb
     */
    findOneAndUpdate(process, docTypeName, pk, data, cb) {
        let funcs = [];
        let pkData = {};
        let processInfo = Process.getInfo(process);
        let orgId = processInfo ? processInfo.orgId : '';
        let orgType;
        let docData;

        // get the document type
        funcs.push(next => {
            Domains.orgdoctypes().dcrud.findOne({ name: docTypeName }).select({ fields: 1 }).lean().exec((err, retOrgType) => {
                if(!err && retOrgType !== null) {
                    orgType = retOrgType;
                    next();
                } else {
                   next(Boom.notFound);
                }
            });
        });

        // process data
        funcs.push(next => {
            // process primary key
            pkData.orgId = orgId;
            pkData.docTypeId = orgType._id.toString();
            // check if the pks exist in the index of the doc type
            _.mapKeys(pk, (value, key) => {
                let field = _.find(orgType.fields, f => f.name === key);
                if(field) {
                    pkData[`docTypeFieldsData.${key}`] = value;
                }
            });
            next();
        });

        funcs.push(next => {
            Domains.documents().dcrud.findOneAndUpdate(pkData, data, { new: true }).select({ _id: 1, category: 1, tags: 1, documentDate: 1, docId: 1, docTypeFieldsData: 1 }).lean().exec((err, retData) => {
                if(err || retData === null) {
                    err = Boom.notFound();
                } else {
                    docData = retData;
                }
                next(err);
            });
        });

        Async.series(funcs, err => {
            if(cb) {
                cb(err, docData);
            }
        })
    }

    /**
     * Find one document from a primnary key. If there is more than one, it returns the first one that finds.
     * @param process: the current process.
     * @param docTypeName: the name of the doc type.
     * @param cond: the condition to find the document.
     * @param cb
     */
    findOne(process, docTypeName, cond, cb) {
        let funcs = [];
        let condData = {};
        let processInfo = Process.getInfo(process);
        let orgId = processInfo ? processInfo.orgId : '';
        let orgType;
        let data = {};

        // get the document type
        funcs.push(next => {
            Domains.orgdoctypes().dcrud.findOne({ name: docTypeName }).select({ fields: 1 }).lean().exec((err, retOrgType) => {
                if(!err && retOrgType !== null) {
                    orgType = retOrgType;
                    next();
                } else {
                    next(Boom.notFound);
                }
            });
        });

        // process data
        funcs.push(next => {
            // process primary key
            condData.orgId = orgId;
            condData.docTypeId = orgType._id.toString();
            // check if the pks exist in the index of the doc type
            _.mapKeys(cond, (value, key) => {
                let field = _.find(orgType.fields, f => f.name === key);
                if(field) {
                    condData[`docTypeFieldsData.${key}`] = value;
                }
            });
            next();
        });

        funcs.push(next => {
            Domains.documents().dcrud.findOne(condData).select({ _id: 1, category: 1, tags: 1, documentDate: 1, docId: 1, docTypeFieldsData: 1 }).lean().exec((err, retData) => {
                if(err || retData === null) {
                    err = Boom.notFound();
                } else {
                    data = retData;
                }
                next(err);
            });
        });

        Async.series(funcs, err => {
            if(cb) {
                cb(err, data);
            }
        })
    }

    /**
     * Find all documents from a condition. But always a limit of 100 returns.
     * @param process: the current process.
     * @param docTypeName: the name of the doc type.
     * @param cond: the condition to find the document.
     * @param limit: limit the data it returns. If not provided, the limit is 100. If bigger than 100, the limit will still be 100.
     * @param cb
     */
    find(process, docTypeName, cond, cb) {
        let funcs = [];
        let condData = {};
        let processInfo = Process.getInfo(process);
        let orgId = processInfo ? processInfo.orgId : '';
        let orgType;
        let aResult = [];

        // ensure correct limit
        limit = limit || 100;

        if(limit < 1) {
            limit = 1;
        } else if(limit > 100) {
            limit = 100;
        }

        // get the document type
        funcs.push(next => {
            Domains.orgdoctypes().dcrud.findOne({ name: docTypeName }).select({ fields: 1 }).lean().exec((err, retOrgType) => {
                if(!err && retOrgType !== null) {
                    orgType = retOrgType;
                    next();
                } else {
                    next(Boom.notFound);
                }
            });
        });

        // process data
        funcs.push(next => {
            // process primary key
            condData.orgId = orgId;
            condData.docTypeId = orgType._id.toString();
            // check if the pks exist in the index of the doc type
            _.mapKeys(cond, (value, key) => {
                let field = _.find(orgType.fields, f => f.name === key);
                if(field) {
                    condData[`docTypeFieldsData.${key}`] = value;
                }
            });
            next();
        });

        funcs.push(next => {
            Domains.documents().dcrud.findOne(condData).select({ _id: 1, category: 1, tags: 1, documentDate: 1, docId: 1, docTypeFieldsData: 1 }).limit(limit).lean().exec((err, retData) => {
                if(err || retData === null) {
                    err = Boom.notFound();
                } else {
                    aResult = retData;
                }
                next(err);
            });
        });

        Async.series(funcs, err => {
            if(cb) {
                cb(err, aResult);
            }
        })
    }
}

class Email {

    constructor() {
        const self = this;
        self.process;
        self.processInfo;
        self.props;
    }

    _getPreviewBindings() {
        let previewClassMap = {
            html: 'cloudbrasil-message html',
            body: 'cloudbrasil-message body',
            h1: 'cloudbrasil-message header',
            h2: 'cloudbrasil-message header',
            h3: 'cloudbrasil-message header',
            h4: 'cloudbrasil-message header',
            h5: 'cloudbrasil-message header',
            h6: 'cloudbrasil-message header',
            ol: 'cloudbrasil-message ol',
            ul: 'cloudbrasil-message ul',
            li: 'cloudbrasil-message li',
            p: 'cloudbrasil-message p',
            blockquote: 'cloudbrasil-message blockquote',
            pre: 'cloudbrasil-message pre',
            code: 'cloudbrasil-message code',
            kbd: 'cloudbrasil-message kbd',
            samp: 'cloudbrasil-message samp',
            dd: 'cloudbrasil-message dd',
            dl: 'cloudbrasil-message dl',
            sup: 'cloudbrasil-message sup',
            sub: 'cloudbrasil-message sub',
            table: 'cloudbrasil-message table',
            th: 'cloudbrasil-message th',
            td: 'cloudbrasil-message td',
            tt: 'cloudbrasil-message tt',
            hr: 'cloudbrasil-message hr'
        };
        let aBindings = [];
        _.mapKeys(previewClassMap, (value, key) => {
            aBindings.push({
                type: 'output',
                regex: new RegExp('<' + key + '>', 'g'),
                replace: '<' + key + ' class="' + value + '">'
            })
        });

        aBindings.push({
            type: 'output',
            regex: /<img/g,
            replace: '<img class="cloudbrasil-message img"'
        });

        aBindings.push({
            type: 'output',
            regex: /<a/g,
            replace: '<a class="cloudbrasil-message a"'
        });

        return aBindings;
    }

    _converMessageToHTML(message) {
        const self = this;

        let converter = new Showdown.Converter({
            extensions: self._getPreviewBindings(),
            noHeaderId: true,
            parseImgDimensions: true,
            strikethrough: true,
            tables: true,
            tasklists: true,
            simpleLineBreaks: true,
            openLinksInNewWindow: true,
            emoji: true,
            underline: true,
            completeHTMLDocument: true
        });
        let html = converter.makeHtml(message);
        return html;
    }

    _pushContextData(context, key, value) {
        _.set(context, key, value);
    }

    _prepValue(value) {
        // You can't start a name with #^/!><={& or ], and you can't have }} or . anywhere in a name.
        return value.replace(/ |#|\^|\=|\/|\!|\>|\<|\{|&|\]|\./g, '_');
    }

    _getEmailContext() {
        const self = this;
        let context = {};
        let historyEntries = self.process.getHistoryEntries();

        // Get the process info
        let processInfo = Process.getInfo(self.process);
        if(!_.isEmpty(processInfo)) {
            self._pushContextData(context, `process.name`, processInfo.processName);
            self._pushContextData(context, `process.description`, processInfo.processDescription);
            let aGroupNames = _.map(processInfo.processParticipantsGroup, item => {
                if(item.type === 'Grupo') {
                    return item.group;
                }
                return null;
            });
            self._pushContextData(context, `process.participantGroup.names`, HD.format.list(aGroupNames));
            self._pushContextData(context, `process.userGroup.names`, HD.format.list(processInfo.userGroups));
            self._pushContextData(context, `process.user.name`, processInfo.userName);
            self._pushContextData(context, `process.protocol`, processInfo.protocol);
        }

        _.each(historyEntries, (entry) => {
            if(Process.isUserTask(entry.type)) {
                let name = self._prepValue(entry.name);
                let task = Process.getLastUserTaskFromEntry(entry);
                let data = task.data;
                if(!_.isEmpty(data)) {
                    if (!_.isEmpty(data.selectedDocs)) {
                        self._pushContextData(context, `${name}.selectedDocuments`, data.selectedDocs);
                    } else {
                        self._pushContextData(context, `${name}.selectedDocuments`, []);
                    }
                    if (!_.isEmpty(data.selectedDocs)) {
                        self._pushContextData(context, `${name}.selectedAssignees`, data.selectedAssignees);
                    } else {
                        self._pushContextData(context, `${name}.selectedAssignees`, []);
                    }
                    if (!_.isEmpty(data.formData)) {
                        _.each(data.formData, (group) => {
                            let groupName = self._prepValue(group.name);
                            self._pushContextData(context, `${name}.${groupName}.name`, groupName);
                            _.each(group.fields, (field) => {
                                let fieldValue = self.props.getValueFromField(field);
                                let fieldName = self._prepValue(field.name);
                                if(fieldValue) {
                                    if (field.type === 'duedate') {
                                        self._pushContextData(context, `${name}.${groupName}.${fieldName}.priority`, fieldValue.priority);
                                        self._pushContextData(context, `${name}.${groupName}.${fieldName}.dueDate`, fieldValue.dueDate);
                                    } else {
                                        const check = Process.utils.check;
                                        let value = fieldValue.value;
                                        if (field.type === 'date') {
                                            value = check.date(value, field.format, self.processInfo.timezone);
                                        } else {
                                            value = check[field.type](value);
                                        }
                                        self._pushContextData(context, `${name}.${groupName}.${fieldName}`, value);
                                    }
                                }
                            });
                        });
                    }
                }
            }
        });
        return context;
    }

    _isLegalEamil(email) {
        if(email.indexOf(";") !== -1 || email.indexOf(",") !== -1 || email.indexOf(" ") !== -1 || email.indexOf('@') === -1) {
            return false;
        }
        let filter = /(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return filter.test(email);
    }

    _getUsers(sendToList, cb) {
        const self = this;
        const orgId = self.processInfo.orgId;
        let funcs = [];
        let aUsers = [];
        //     - sendToList
        //     *      - if type === Grupo
        //         *          - typeToAdd: [Grupo ou Dono do Grupo]
        //     *          - groupToAdd: Group Name
        //     *      - if type === Emails
        //         *          - emailsToAdd: Email list separated by ;
        //     *       - if type === Propriedade
        //         *          - property: a propriedade com o valor
        //         *          - propertyType: o tipo do valor (Email, Grupo ou Dono do Grupo
        _.each(sendToList, (item) => {
            if(item.type === 'Emails') {
                funcs.push((next) => {
                    let aEmails = item.emailsToAdd.split(';');
                    _.each(aEmails, (email) => {
                        if(self._isLegalEamil(email)) {
                            aUsers.push({email: email.trim()});
                        }
                    });
                    next();
                });

            } else if(item.type === 'Grupo' && item.typeToAdd === 'Grupo') {
                funcs.push((next) => {
                    Domains.orgchart().getGroupsUsers(orgId, [item.groupToAdd], (err, retGroups) => {
                        if(!err && retGroups !== null && retGroups.length >= 1) {
                            _.each(retGroups, (group) => {
                                _.map(group.users, (userInfo) => aUsers.push({ name: userInfo.user.name, email: userInfo.user.email }));
                            });
                        }
                        next();
                    });
                });

            } else if(item.type === 'Grupo' && item.typeToAdd === 'Dono do Grupo') {
                funcs.push((next) => {
                    Domains.orgchart().getGroupsBoss(orgId, [item.groupToAdd], (err, retGroups) => {
                        if(!err && retGroups !== null && retGroups.length >= 1) {
                            aUsers.push({ email: retGroups[0].boss.user.email, name: retGroups[0].boss.user.name });
                        }
                        next();
                    });
                });
            } else if(item.type === 'Propriedade') {
                funcs.push((next) => {
                    let propValue = self.props.get(item.property);
                    if(!_.isUndefined(propValue) && propValue !== null && propValue !== '') {
                        if (item.propertyType === 'Email' && _.isFunction(propValue.split)) {
                            let aEmails = propValue.split(';');
                            _.each(aEmails, (email) => {
                                if (self._isLegalEamil(email)) {
                                    aUsers.push({email: email.trim()});
                                }
                            });
                            next();
                        } else if (item.propertyType === 'Grupo') {
                            Domains.orgchart().getGroupsUsers(orgId, [propValue], (err, retGroups) => {
                                if (!err && retGroups !== null && retGroups.length >= 1) {
                                    _.each(retGroups, (group) => {
                                        _.map(group.users, (userInfo) => aUsers.push({
                                            name: userInfo.user.name,
                                            email: userInfo.user.email
                                        }));
                                    });
                                }
                                next();
                            });
                        } else if (item.propertyType === 'Dono do Grupo') {
                            Domains.orgchart().getGroupsBoss(orgId, [propValue], (err, retGroups) => {
                                if (!err && retGroups !== null && retGroups.length >= 1) {
                                    aUsers.push({
                                        email: retGroups[0].boss.user.email,
                                        name: retGroups[0].boss.user.name
                                    });
                                }
                                next();
                            });
                        }
                    } else {
                        next();
                    }
                });
            }
        });

        Async.parallelLimit(funcs, 10, () => {
            aUsers = _.uniq(aUsers, item => item.email);
            cb(null, aUsers);
        });
    }

    _sendUserEmails(aUsers) {
        aUsers = _.uniq(aUsers, (item) => item.email);
        _.each(aUsers, (user) => {
            if(!_.isUndefined(user.email) && user.email !== '' && user.email.indexOf('@') !== -1) {
                Domains.email().sendDirectMail({
                    html: user.message,
                    from: 'naoresponda@cloudbrasil.io',
                    to: user.email,
                    subject: user.subject
                });
            }
        });
    }

    /**
     * Send Email
     * @param options
     *  - stepId: the step id to get stepProperties from
     *  - process: the process so we can get the data from it to merge
     * @param cb
     */
    send(options) {
        const self = this;
        let funcs = [];
        let aUsers = [];
        let stepProperties;
        let context = {};
        let htmlTemplate = '';
        self.process = options.process;
        self.props = new Props({
            process: self.process
        });

        // get properties
        funcs.push((next) => {
            stepProperties = Process.getStepProperties(self.process, options.stepId);
            self.processInfo = Process.getInfo(self.process);
            next();
        });

        // get the send to list, with users information (name and email)
        funcs.push((next) => {
            self._getUsers(stepProperties.sendToList, (err, retUsers) => {
                if(!err && retUsers !== null) {
                    aUsers = retUsers;
                }
                next(err);
            });
        });

        // get email context
        funcs.push((next) => {
            context = self._getEmailContext();
            next();
        });

        // tranform message to HTML
        funcs.push((next) => {
            htmlTemplate = Handlebars.compile(self._converMessageToHTML(stepProperties.message));
            next();
        });

        // create the emails per users
        funcs.push((next) => {
            _.each(aUsers, (user) => {
                try {
                    user.message = htmlTemplate(context);
                } catch(ex) {
                    user.message = '';
                }
                user.subject = stepProperties.subject;
            });
            next();
        });

        // send the emails
        funcs.push((next) => {
            self._sendUserEmails(aUsers);
            next();
        });

        // add history to the step
        funcs.push((next) => {
            let entryData = {
                type: 'sendTask',
                flowId: stepProperties.id,
                name: stepProperties.flowName,
                subject: stepProperties.subject,
                emailsSent: aUsers,
                data: { stepProperties }
            };

            // add the history and persist
            self.process.addHistoryEntryData(options.stepId, entryData);
            next();
        });

        // persist the process
        funcs.push((next) => {
            self.process.persist(() => {
                next();
            });
        });

        Async.series(funcs, () => {})
    }
}

/**
 * Class that defines all the available actions on the system
 * @class
 */
class Actions {
    constructor() {
        const self = this;
        self.documents = new Documents();
        self.email = new Email();
    }

    documents() {
        const self = this;
        return self.documents;
    }

    email() {
        const self = this;
        return self.email;
    }
}

let actions = new Actions();

module.exports = actions;
