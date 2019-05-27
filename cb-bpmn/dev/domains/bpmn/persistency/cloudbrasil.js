/*
 * Options
 */
var options = {};

/**
 * @param {String} uri
 * @param {*} options
 * @constructor
 */
var Persistency = exports.Persistency = function(uri, options) {
    var self = this;
    self.model = options.model;
    if (options.trace) {
        self._trace = function(message) {
            console.log(message);
        };
    } else {
        self._trace = function() {};
    }

};

/**
 * @param {{processInstanceId: String}} persistentData
 * @param {Function} done
 */
Persistency.prototype.persist = function(persistentData, done) {
    this._findAndModify(persistentData, done);
};

/**
 * @param {String} processId
 * @param {String} processName
 * @param done
 */
Persistency.prototype.load = function(processId, processName, done) {
    this._find({processId: processId, processName: processName}, done);
};

/**
 * @param {String} processName
 * @param done
 */
Persistency.prototype.loadAll = function(processName, done) {
    this._findAll(processName, done);
};

/**
 * @param query
 * @param done
 */
Persistency.prototype.remove = function(query, done) {
    var self = this;
    self.model.dcrud.remove(query, function(err, retInfo) {
        done(null, retInfo);
    });
};

/**
 * @param done
 */
Persistency.prototype.close = function(done) {
    done();
};

/**
 * @param db
 * @param query
 * @param done
 * @private
 */
Persistency.prototype._find = function(query, done) {
    var self = this;
    var processId = query.processId;
    var processName = query.processName;
    self.model.dcrud.findOne(query).lean().exec(function(err, document) {
        if(err) {
            self._trace("Couldn't find '" + processName + "' ('" + processId + "'). Error: '" + err + "'.");
            done(err);
        } else {
            if (err || document === null) {
                self._trace("Didn't find '" + processName + "' ('" + processId + "').");
                done();
            } else {
                self._trace("Found '" + processName + "' ('" + processId + "').");
                done(null, document);
            }
        }
    });
};

/**
 * @param db
 * @param processName
 * @param done
 * @private
 */
Persistency.prototype._findAll = function(processName, done) {
    var self = this;

    self.model.dcrud.find({processName: processName, 'history.finishedAt': null}).lean().exec(function(err, documents) {
        if(err) {
            self._trace("Couldn't find '" + processName + ". Error: '" + err + "'.");
            done(err);
        } else {
            done(null, documents);
        }
    });
};

/**
 * @param db
 * @param persistentData
 * @param done
 * @private
 */
Persistency.prototype._findAndModify = function(persistentData, done) {
    var self = this;
    var processId = persistentData.processId;
    var processName = persistentData.processName;
    self._trace("Start persisting '" + processName + "'");
    self.model.dcrud.findOneAndUpdate({processName: processName, processId: processId}, persistentData, {upsert: true, new: true}).lean().exec(function(err, retData) {
        if(err) {
            self._trace("Couldn't persist '" + processName + "' ('" + processId + "'). Error: '" + err + "'.");
            done(err);
        } else {
            persistentData._id = retData._id;
            self._trace("Persisted '" + processName + "' ('" + processId + "').");
            done(null, retData);
        }
    });
};

