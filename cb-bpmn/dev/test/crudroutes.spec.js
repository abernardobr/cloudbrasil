const _ = require('lodash');
const TU = require('../domains/helpers/modules/utils');
const expect = require('chai').expect;
const Sinon = require('sinon');
const Proxyquire = require('proxyquire');
const Joi = require('joi');

Proxyquire.noPreserveCache();

class CRUDMemoryMock {
    populate() {}
    DIRECT() {}
    create() {}
    count() {}
    findByIdAndUpdate() {}
    findByIdAndRemove() {}
    findById() {}
    find() {}
}

class FacilitiesMock {
    constructor() {
        this.crudmemory = new CRUDMemoryMock();
    }
    init() {}
}

let FacilitiesController = Proxyquire('./domains/facilitiesmemory/controllers/facilities', {
    '../modules/facilities': FacilitiesMock
});

const requestMock = {
    isBoom: false,
    response: {
        output: {
            statusCode: 200
        }
    }
};

const replyMock = {
    reply: (err, retData) => {
        const self = this;
        self.code = null;
        self.err = err;
        self.retData = retData;
        return {
            code: (value) => {
                self.code = value;
            },
            getResult: () => {
                return { code: self.code, err: self.err, retData: self.retData };
            }
        };
    }
};

const newItem = {
    name: 'New Item',
    description: 'New Item Description'
};

describe('CRUDRoutes Tests', () => {
    // test cases
    it('Creating routes', (done) => {
        expect(FacilitiesController.routes).is.not.undefined;
        expect(FacilitiesController.routes).is.not.empty;
        expect(FacilitiesController.routes.length).equal(6);
        done();
    });

    it('Create route called', (done) => {
        const route = FacilitiesController.routes[0];

        expect(Joi.validate(newItem, route.config.validate.payload).error).to.be.null;
        expect(route.method).equal('POST');
        expect(route.path).equal('/api/facilities');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({
            payload: newItem
        }, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'create');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.create.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.create.calledOnce).to.equal(true);

        Sinon.spy(TU.server, 'respond');

        // test the callback
        let createCallback = FacilitiesController.controller.model.crudmemory.create.getCalls()[0].args[1];
        createCallback('err-create', 'retData-create');
        expect(TU.server.respond.calledWith(request, reply, 'err-create', 'retData-create')).to.equal(true);

        done();
    });

    it('Get route called', (done) => {
        const route = FacilitiesController.routes[1];

        expect(route.config.validate).to.be.undefined;
        expect(route.method).equal('GET');
        expect(route.path).equal('/api/facilities/{id}');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({
            params: {
                id: TU.random.guid()
            }
        }, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'findById');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.findById.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.findById.calledOnce).to.equal(true);

        // test the callback
        let findByIdCallback = FacilitiesController.controller.model.crudmemory.findById.getCalls()[0].args[1];
        findByIdCallback('err-findById', 'retData-findById');
        expect(TU.server.respond.calledWith(request, reply, 'err-findById', 'retData-findById')).to.equal(true);

        done();
    });

    it('Search route called', (done) => {
        const route = FacilitiesController.routes[2];

        expect(route.config.validate).to.be.undefined;
        expect(route.method).equal('GET');
        expect(route.path).equal('/api/facilities');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({
            query: { }
        }, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'find');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.find.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.find.calledOnce).to.equal(true);

        // test the callback
        let findCallback = FacilitiesController.controller.model.crudmemory.find.getCalls()[0].args[1];
        findCallback('err-find', 'retData-find');
        expect(TU.server.respond.calledWith(request, reply, 'err-find', 'retData-find')).to.equal(true);

        done();
    });

    it('Update route called', (done) => {
        const route = FacilitiesController.routes[3];

        expect(Joi.validate(newItem, route.config.validate.payload).error).to.be.null;
        expect(route.method).equal('PUT');
        expect(route.path).equal('/api/facilities/{id}');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({
            params: { id: TU.random.guid() },
            payload: newItem
        }, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'findByIdAndUpdate');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.findByIdAndUpdate.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.findByIdAndUpdate.calledOnce).to.equal(true);

        // test the callback
        let findByIdAndUpdateCallback = FacilitiesController.controller.model.crudmemory.findByIdAndUpdate.getCalls()[0].args[1];
        findByIdAndUpdateCallback('err-findByIdAndUpdate', 'retData-findByIdAndUpdate');
        expect(TU.server.respond.calledWith(request, reply, 'err-findByIdAndUpdate', 'retData-findByIdAndUpdate')).to.equal(true);

        done();
    });

    it('Delete route called', (done) => {
        const route = FacilitiesController.routes[4];

        expect(route.config.validate).to.be.undefined;
        expect(route.method).equal('DELETE');
        expect(route.path).equal('/api/facilities/{id}');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({
            params: { id: TU.random.guid() }
        }, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'findByIdAndRemove');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.findByIdAndRemove.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.findByIdAndRemove.calledOnce).to.equal(true);

        // test the callback
        let findByIdAndRemoveCallback = FacilitiesController.controller.model.crudmemory.findByIdAndRemove.getCalls()[0].args[1];
        findByIdAndRemoveCallback('err-findByIdAndRemove', 'retData-findByIdAndRemove');
        expect(TU.server.respond.calledWith(request, reply, 'err-findByIdAndRemove', 'retData-findByIdAndRemove')).to.equal(true);

        done();
    });

    it('Count route called', (done) => {
        const route = FacilitiesController.routes[5];

        expect(route.config.validate).to.be.undefined;
        expect(route.method).equal('GET');
        expect(route.path).equal('/api/facilities/count');

        const funcHandler = route.config.handler;

        let request = _.defaultsDeep({}, requestMock);

        let reply = replyMock.reply;

        Sinon.spy(FacilitiesController.controller.model.crudmemory, 'count');
        funcHandler.call(route.config.bind, request, reply);

        expect(FacilitiesController.controller.model.crudmemory.count.called).to.equal(true);
        expect(FacilitiesController.controller.model.crudmemory.count.calledOnce).to.equal(true);

        // test the callback
        let countCallback = FacilitiesController.controller.model.crudmemory.count.getCalls()[0].args[1];
        countCallback('err-count', 'retData-count');
        expect(TU.server.respond.calledWith(request, reply, 'err-count', 'retData-count')).to.equal(true);
        done();
    });
});