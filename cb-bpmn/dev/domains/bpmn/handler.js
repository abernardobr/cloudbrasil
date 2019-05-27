/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var fileUtils = require('./utils/file.js');
var _ = require('lodash');

var timeoutHandlerName = 'getTimeout';
var handlerNameSeparator = '$';

exports.handlerNameSeparator = handlerNameSeparator;
exports.timeoutHandlerName = timeoutHandlerName;

/**
 * @param {String} name
 * @param {BPMNProcess} process
 * @param {Object=} data
 * @param {Function=} handlerDoneCallback
 * @private
 */
exports.callHandler = function(name, process, data, handlerDoneCallback) {
    var result, handlerType;
    var done = handlerDoneCallback || function() {};
    var eventType = "callHandler";
    var handler = getHandlerFromProcess(name, process);

    if (handler) {
        handlerType = typeof handler;
        if (handlerType === 'function') {
            try {
                result = handler.call(process.processClient, data, done);
            } catch (error) {
                process.logger.error("Error in handler '" + name + "': " + error.toString());
                process.defaultErrorHandler.call(process.processClient, error, done);
            }
        } else if (handlerType === 'object') {
            // hierarchical handler used for mocking up sub process handlers. See test cases for examples
            // To keep going we have to call done()
            done();
        } else {
            process.callDefaultEventHandler(eventType, name, mapName2HandlerName(name),
                "Unknown handler type: '" + handlerType + "'", done);
        }
    } else {
        process.callDefaultEventHandler(eventType, name, mapName2HandlerName(name), "No handler found", done, data);
    }

    return result;
};

/**
 * @param {String} bpmnFilePath
 * @return {String}
 */
var getHandlerFileName = exports.getHandlerFileName = function(bpmnFilePath) {
    return (fileUtils.removeFileExtension(bpmnFilePath) + ".js");
};

/**
 * @param {String} name
 * @param {BPMNProcess} process
 * @return {Function | Object}
 */
var getHandlerFromProcess = exports.getHandlerFromProcess = function(name, process) {
    var handlerName = mapName2HandlerName(name);
    var handler = process.eventHandler[handlerName]; // this works as long as event names are unique
    return handler;
};

/**
 * @param {String} bpmnFilePath
 * @return {Object}
 */
exports.getHandlerFromFile = function(bpmnFilePath) {
    var handlerFilePath = getHandlerFileName(bpmnFilePath);
    return require(handlerFilePath);
};


/**
 * @param {String} moduleString
 * @param {String} processName
 * @return {Object}
 */
exports.getHandlerFromString = function(moduleString, processName) {
    var Module = require('module').Module;
    var handlerModule = new Module();
    handlerModule._compile(stripBOM(moduleString), processName);
    return handlerModule.exports;
};

function stripBOM(content) {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}

/**
 * replace extended chars to ASCII and make is canonical. If start with a number, prefix with _
 * Example: E-mail noemal úé $%ˆ& --> emailNoemalUe
 * @param {String} name
 * @return {String}
 */
var mapName2HandlerName = exports.mapName2HandlerName = function(name, prefix) {
    var _convertExtCharToNormal =  function(char) {
        var transliterationTable = {'\n': '', '\t': '', '\r': '', '/': '\/', '\\': '', 'á' : 'a', 'Á' : 'A', 'à' : 'a', 'À' : 'A', 'ă' : 'a', 'Ă' : 'A', 'â' : 'a', 'Â' : 'A', 'å' : 'a', 'Å' : 'A', 'ã' : 'a', 'Ã' : 'A', 'ą' : 'a', 'Ą' : 'A', 'ā' : 'a', 'Ā' : 'A', 'ä' : 'ae', 'Ä' : 'AE', 'æ' : 'ae', 'Æ' : 'AE', 'ḃ' : 'b', 'Ḃ' : 'B', 'ć' : 'c', 'Ć' : 'C', 'ĉ' : 'c', 'Ĉ' : 'C', 'č' : 'c', 'Č' : 'C', 'ċ' : 'c', 'Ċ' : 'C', 'ç' : 'c', 'Ç' : 'C', 'ď' : 'd', 'Ď' : 'D', 'ḋ' : 'd', 'Ḋ' : 'D', 'đ' : 'd', 'Đ' : 'D', 'ð' : 'dh', 'Ð' : 'Dh', 'é' : 'e', 'É' : 'E', 'è' : 'e', 'È' : 'E', 'ĕ' : 'e', 'Ĕ' : 'E', 'ê' : 'e', 'Ê' : 'E', 'ě' : 'e', 'Ě' : 'E', 'ë' : 'e', 'Ë' : 'E', 'ė' : 'e', 'Ė' : 'E', 'ę' : 'e', 'Ę' : 'E', 'ē' : 'e', 'Ē' : 'E', 'ḟ' : 'f', 'Ḟ' : 'F', 'ƒ' : 'f', 'Ƒ' : 'F', 'ğ' : 'g', 'Ğ' : 'G', 'ĝ' : 'g', 'Ĝ' : 'G', 'ġ' : 'g', 'Ġ' : 'G', 'ģ' : 'g', 'Ģ' : 'G', 'ĥ' : 'h', 'Ĥ' : 'H', 'ħ' : 'h', 'Ħ' : 'H', 'í' : 'i', 'Í' : 'I', 'ì' : 'i', 'Ì' : 'I', 'î' : 'i', 'Î' : 'I', 'ï' : 'i', 'Ï' : 'I', 'ĩ' : 'i', 'Ĩ' : 'I', 'į' : 'i', 'Į' : 'I', 'ī' : 'i', 'Ī' : 'I', 'ĵ' : 'j', 'Ĵ' : 'J', 'ķ' : 'k', 'Ķ' : 'K', 'ĺ' : 'l', 'Ĺ' : 'L', 'ľ' : 'l', 'Ľ' : 'L', 'ļ' : 'l', 'Ļ' : 'L', 'ł' : 'l', 'Ł' : 'L', 'ṁ' : 'm', 'Ṁ' : 'M', 'ń' : 'n', 'Ń' : 'N', 'ň' : 'n', 'Ň' : 'N', 'ñ' : 'n', 'Ñ' : 'N', 'ņ' : 'n', 'Ņ' : 'N', 'ó' : 'o', 'Ó' : 'O', 'ò' : 'o', 'Ò' : 'O', 'ô' : 'o', 'Ô' : 'O', 'ő' : 'o', 'Ő' : 'O', 'õ' : 'o', 'Õ' : 'O', 'ø' : 'oe', 'Ø' : 'OE', 'ō' : 'o', 'Ō' : 'O', 'ơ' : 'o', 'Ơ' : 'O', 'ö' : 'oe', 'Ö' : 'OE', 'ṗ' : 'p', 'Ṗ' : 'P', 'ŕ' : 'r', 'Ŕ' : 'R', 'ř' : 'r', 'Ř' : 'R', 'ŗ' : 'r', 'Ŗ' : 'R', 'ś' : 's', 'Ś' : 'S', 'ŝ' : 's', 'Ŝ' : 'S', 'š' : 's', 'Š' : 'S', 'ṡ' : 's', 'Ṡ' : 'S', 'ş' : 's', 'Ş' : 'S', 'ș' : 's', 'Ș' : 'S', 'ß' : 'SS', 'ť' : 't', 'Ť' : 'T', 'ṫ' : 't', 'Ṫ' : 'T', 'ţ' : 't', 'Ţ' : 'T', 'ț' : 't', 'Ț' : 'T', 'ŧ' : 't', 'Ŧ' : 'T', 'ú' : 'u', 'Ú' : 'U', 'ù' : 'u', 'Ù' : 'U', 'ŭ' : 'u', 'Ŭ' : 'U', 'û' : 'u', 'Û' : 'U', 'ů' : 'u', 'Ů' : 'U', 'ű' : 'u', 'Ű' : 'U', 'ũ' : 'u', 'Ũ' : 'U', 'ų' : 'u', 'Ų' : 'U', 'ū' : 'u', 'Ū' : 'U', 'ư' : 'u', 'Ư' : 'U', 'ü' : 'ue', 'Ü' : 'UE', 'ẃ' : 'w', 'Ẃ' : 'W', 'ẁ' : 'w', 'Ẁ' : 'W', 'ŵ' : 'w', 'Ŵ' : 'W', 'ẅ' : 'w', 'Ẅ' : 'W', 'ý' : 'y', 'Ý' : 'Y', 'ỳ' : 'y', 'Ỳ' : 'Y', 'ŷ' : 'y', 'Ŷ' : 'Y', 'ÿ' : 'y', 'Ÿ' : 'Y', 'ź' : 'z', 'Ź' : 'Z', 'ž' : 'z', 'Ž' : 'Z', 'ż' : 'z', 'Ż' : 'Z', 'þ' : 'th', 'Þ' : 'Th', 'µ' : 'u', 'а' : 'a', 'А' : 'a', 'б' : 'b', 'Б' : 'b', 'в' : 'v', 'В' : 'v', 'г' : 'g', 'Г' : 'g', 'д' : 'd', 'Д' : 'd', 'е' : 'e', 'Е' : 'e', 'ё' : 'e', 'Ё' : 'e', 'ж' : 'zh', 'Ж' : 'zh', 'з' : 'z', 'З' : 'z', 'и' : 'i', 'И' : 'i', 'й' : 'j', 'Й' : 'j', 'к' : 'k', 'К' : 'k', 'л' : 'l', 'Л' : 'l', 'м' : 'm', 'М' : 'm', 'н' : 'n', 'Н' : 'n', 'о' : 'o', 'О' : 'o', 'п' : 'p', 'П' : 'p', 'р' : 'r', 'Р' : 'r', 'с' : 's', 'С' : 's', 'т' : 't', 'Т' : 't', 'у' : 'u', 'У' : 'u', 'ф' : 'f', 'Ф' : 'f', 'х' : 'h', 'Х' : 'h', 'ц' : 'c', 'Ц' : 'c', 'ч' : 'ch', 'Ч' : 'ch', 'ш' : 'sh', 'Ш' : 'sh', 'щ' : 'sch', 'Щ' : 'sch', 'ъ' : '', 'Ъ' : '', 'ы' : 'y', 'Ы' : 'y', 'ь' : '', 'Ь' : '', 'э' : 'e', 'Э' : 'e', 'ю' : 'ju', 'Ю' : 'ju', 'я' : 'ja', 'Я' : 'ja'},
            resultChar = transliterationTable[char];

        if(_.isUndefined(resultChar))
            return char;

        return resultChar;
    }

    var _convertExtWordToNormal = function(word) {
        var finalWord = "";
        word = word.toString();
        _.each(word, function(char) {
            finalWord += _convertExtCharToNormal(char);
        });

        return finalWord;
    }

    var _firstToUpper = function(name) {
        return name[0].toUpperCase() + name.slice(1);
    }

    var _firstToLower = function(name) {
        return name[0].toLowerCase() + name.slice(1);
    }

    var _cleanName = function(words) {
        var tokens = _convertExtWordToNormal(words).toLowerCase().trim().split(' ');
        if(prefix) {
            tokens.unshift(prefix);
        }
        var cleanName = "";
        _.each(tokens, function(word, key) {
            if(!_.isUndefined(word) && word !== null && _.isFunction(word.trim)) {
                word = word.trim();
            }
            var newWord = (key > 0 ? _firstToUpper(word) : _firstToLower(word));
            cleanName += newWord.replace(/[^\w\s]/gi, '');
        });

        if (cleanName.match(/^[0-9]/)) {
            cleanName = "_" + cleanName;
        }
        return cleanName;
    }

    if(_.isUndefined(name) || name === '' || name === null || !_.isFunction(name.split)) {
        return '';
    }

    // check if we have a postFix
    var split = name.split(handlerNameSeparator);
    var handlerName = _cleanName(split[0]);
    var postFix = '';

    if(split.length > 1) {
        if(split[1] !== timeoutHandlerName) {
            split[1] = _cleanName(split[1]);
        }
        postFix = handlerNameSeparator + split[1];
    }

    return handlerName + postFix;
};
