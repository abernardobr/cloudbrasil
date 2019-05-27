/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var urls = require('url');
var parserUtils = require("./parsing/parserUtils.js");

/**
 * @param node
 * @param {String} fileName
 * @constructor
 */
exports.createDebuggerInterface = function(node, fileName) {
    return (new DebuggerInterface(parserUtils.getAttributesValue(node, "href"), fileName));
};

/**
 * @param node
 * @return {Boolean}
 */
exports.isDebuggerElement = function(node) {
    return (node.uri === 'http://e2e.ch/bpmneditor/debugger' && node.local === 'position');
};

/**
 * @param {String} url
 * @param {String} fileName
 * @constructor
 */
var DebuggerInterface = exports.DebuggerInterface = function(url, fileName) {
    this.fileName = fileName;
    this.url = urls.parse(url);
};

/**
 * @returns {boolean}
 */
DebuggerInterface.prototype.isInDebugger = function() {
    return (global.v8debug !== undefined);
};

/**
 * @param {BPMNFlowObject} flowObject
 * @param {Logger} logger
 * @param {Function} done
 */
DebuggerInterface.prototype.sendPosition = function(flowObject, logger, done) {
    var self = this;
    var baseUrl = self.url.protocol + '//' + self.url.host;
    var debuggerMessage = {
        filename: this.fileName,
        position: {}
    };

    if (flowObject.bpmnId) {
        debuggerMessage.position.bpmnId = flowObject.bpmnId;
    }

    logger.error("Error sending position to '" + self.url.href);
    done();
};

/**
 * @param {String} url
 * @return {*}
 */
DebuggerInterface.prototype.createRestClient = function(url) {
    return restify.createJsonClient({url: url});
};
