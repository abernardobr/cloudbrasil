const Facilitles = require('../modules/facilities');
const Joi = require('joi');
const CRUDRoutes = require('../../../../domains/helpers/modules/crudroutes');

class FacilitiesController {
    constructor() {
        const self = this;
        let Model = Facilitles;
        self.model = new Model();
        self.model.init();
        self.crudroutes = new CRUDRoutes({
            name: 'facilities',
            model: self.model.crudmemory,
            routes: {
                create: {
                    validate: {
                        payload: {
                            name: Joi.string().required(),
                            description: Joi.string().required(),
                            address: Joi.string(),
                            city: Joi.string(),
                            state: Joi.string(),
                            zip: Joi.string()
                        }
                    }
                },
                get: {},
                search: {},
                update: {
                    validate: {
                        payload: {
                            name: Joi.string(),
                            description: Joi.string(),
                            address: Joi.string(),
                            city: Joi.string(),
                            state: Joi.string(),
                            zip: Joi.string()
                        }
                    }
                },
                delete: {},
                count: {}
            }
        });
    }

    getRoutes() {
        let self = this;
        return self.crudroutes.getRoutes();
    }
}

let controller = new FacilitiesController();

module.exports = {
    controller: controller,
    routes: controller.getRoutes()
};