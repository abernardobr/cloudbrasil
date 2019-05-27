const _ = require('lodash');

const CRUDInterface = require('../../../../domains/helpers/modules/crudinterface');

class CRUDInterfaceCallbacks {
    // Create Callbacks
    createValidate(params, cb) {
        params.callbacks = { findValidate: true };
        cb(null, params);
    }

    createBefore(params, cb) {
        params.callbacks.findBefore = true;
        cb(null, params);
    }

    createAfter(params, cb) {
        params.callbacks.findAfter = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    // findById Callbacks
    findByIdValidate(params, cb) {
        params.callbacks = { findValidate: true };
        cb(null, params);
    }

    findByIdBefore(params, cb) {
        params.callbacks.findBefore = true;
        cb(null, params);
    }

    findByIdAfter(params, cb) {
        params.callbacks.findAfter = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    findByIdExecute(params, cb) {
        params.callbacks.findExecute = true;
        cb(null, params);
    }

    // findByIdAndRemove Callbacks
    findByIdAndRemoveValidate(params, cb) {
        params.callbacks = { findValidate: true };
        cb(null, params);
    }

    findByIdAndRemoveBefore(params, cb) {
        params.callbacks.findBefore = true;
        cb(null, params);
    }

    findByIdAndRemoveAfter(params, cb) {
        params.callbacks.findAfter = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    findByIdAndRemoveExecute(params, cb) {
        params.callbacks.findExecute = true;
        cb(null, params);
    }

    // findByIdAndUpdate Callbacks
    findByIdAndUpdateValidate(params, cb) {
        params.callbacks = { findValidate: true };
        cb(null, params);
    }

    findByIdAndUpdateBefore(params, cb) {
        params.callbacks.findBefore = true;
        cb(null, params);
    }

    findByIdAndUpdateAfter(params, cb) {
        params.callbacks.findAfter = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    findByIdAndUpdateExecute(params, cb) {
        params.callbacks.findExecute = true;
        cb(null, params);
    }

    // Find Callbacks
    findValidate(params, cb) {
        params.callbacks = { findValidate: true };
        cb(null, params);
    }

    findBefore(params, cb) {
        params.callbacks.findBefore = true;
        cb(null, params);
    }

    findAfter(params, cb) {
        params.callbacks.findAfter = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    findExecute(params, cb) {
        params.callbacks.findExecute = true;
        cb(null, params);
    }

    // Count Callbacks
    countExecute(params, cb) {
        params.callbacks = {};
        params.callbacks.findExecute = true;
        params.retData = {};
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }
}

class Facilities {
    constructor(options) {
        const self = this;
        self.options = _.assign({ }, options);
        self.crudmemory = new CRUDInterface({
            timer: true,
            callbacks: CRUDInterfaceCallbacks
        });
    }
}

module.exports = Facilities;