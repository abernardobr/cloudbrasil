const _ = require('lodash');

const CRUDMemory = require('../../../../domains/helpers/modules/crudmemory');

class CRUDMemoryCallbacks {
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
        params.retData.callbacks = params.callbacks;
        cb(null, params);
    }

    findPredicate(query) {
        return (item) => { return item.name.indexOf(query.q) !== -1 };
    }
}

class Facilities {
    constructor(options) {
        const self = this;
        self.options = _.assign({ }, options);
        self.crudmemory = new CRUDMemory({
            timer: true,
            callbacks: CRUDMemoryCallbacks
        });
    }

    init() {
        const self = this;
        let items = [];

        // Populate with dummy data
        _.times(100, (i) => {
            items.push({
                name: `Facility ${i}`,
                description: `Facility ${i} Nice Description`,
                address: `${i} Facility Way`,
                city: `City Facility ${i}`,
                state: 'MA',
                zip: '02138'
            });
        });
        self.crudmemory.populate(items);
    }
}

module.exports = Facilities;