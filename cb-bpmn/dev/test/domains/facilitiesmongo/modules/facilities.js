const _ = require('lodash');

const CRUDMongo = require('../../../../domains/helpers/modules/crudmongo');

class CRUDMongoCallbacks {
    // Create Callbacks
    createValidate(params, cb) {
        params.callbacks = { createValidate: true };
        cb(null, params);
    }

    createBefore(params, cb) {
        params.callbacks.createBefore = true;
        cb(null, params);
    }

    createAfter(params, cb) {
        params.callbacks.createAfter = true;
        if(_.isUndefined(params.retData)) {
            params.retData = {};
        }
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    // findById Callbacks
    findByIdValidate(params, cb) {
        params.callbacks = { findByIdValidate: true };
        cb(null, params);
    }

    findByIdBefore(params, cb) {
        params.callbacks.findByIdBefore = true;
        cb(null, params);
    }

    findByIdAfter(params, cb) {
        params.callbacks.findByIdAfter = true;
        if(_.isUndefined(params.retData)) {
            params.retData = {};
        }
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    // findByIdAndRemove Callbacks
    findByIdAndRemoveValidate(params, cb) {
        params.callbacks = { findByIdAndRemoveValidate: true };
        cb(null, params);
    }

    findByIdAndRemoveBefore(params, cb) {
        params.callbacks.findByIdAndRemoveBefore = true;
        cb(null, params);
    }

    findByIdAndRemoveAfter(params, cb) {
        params.callbacks.findByIdAndRemoveAfter = true;
        if(_.isUndefined(params.retData)) {
            params.retData = {};
        }
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    // findByIdAndUpdate Callbacks
    findByIdAndUpdateValidate(params, cb) {
        params.callbacks = { findByIdAndUpdateValidate: true };
        cb(null, params);
    }

    findByIdAndUpdateBefore(params, cb) {
        params.callbacks.findByIdAndUpdateBefore = true;
        cb(null, params);
    }

    findByIdAndUpdateAfter(params, cb) {
        params.callbacks.findByIdAndUpdateAfter = true;
        if(_.isUndefined(params.retData)) {
            params.retData = {};
        }
        params.retData.callbacks = params.callbacks;
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
        if(_.isUndefined(params.retData)) {
            params.retData = {};
        }
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }
}

class Facilities {
    constructor(options) {
        const self = this;
        self.options = _.assign({ }, options);

        self.crudmongo = new CRUDMongo({
            timer: true,
            name: 'facilities',
            callbacks: CRUDMongoCallbacks
        });
    }
}

module.exports = Facilities;