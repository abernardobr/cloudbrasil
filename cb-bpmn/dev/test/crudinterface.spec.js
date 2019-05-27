const HD = require('@docbrasil/tools');
const _ = require('lodash');
const TU = require('../domains/helpers/modules/utils');
const expect = require('chai').expect;
const Facilities = require('./domains/facilitiesinterface/modules/facilities');

let facilities;
let newFacilityId = TU.random.guid();
let newItem = { name: 'New Item', description: 'New Item Description' };
let updItem = { name: 'New Item Updated', description: 'New Item Description Updated' };

describe('CRUDMemory Tests', function() {
    this.timeout(15000);
    before(function(done) {
        // runs before all tests in this block
        facilities = new Facilities();
        HD.init({
            domains: require('../domains')
        });
        HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
            done();
        });
    });

    // test cases
    it('create', function (done) {
        facilities.crudmemory.create({ item: newItem }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.undefined;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('findById', function (done) {
        facilities.crudmemory.findById({ id: newFacilityId }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('findByIdAndUpdate', function (done) {
        facilities.crudmemory.findByIdAndUpdate({ id: newFacilityId, updItem }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('find', function (done) {
        facilities.crudmemory.find({ query: { q: updItem.name } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('find no query', function (done) {
        facilities.crudmemory.find({ }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('findByIdAndRemove', function (done) {
        facilities.crudmemory.findByIdAndRemove({ id: newFacilityId }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.true;
            done();
        });
    });

    it('count', function (done) {
        facilities.crudmemory.count((err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.undefined;
            expect(retData.callbacks.findBefore).is.undefined;
            expect(retData.callbacks.findExecute).is.true;
            expect(retData.callbacks.findAfter).is.undefined;
            done();
        });
    });
});
