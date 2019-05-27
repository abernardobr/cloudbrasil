const _ = require('lodash');
const expect = require('chai').expect;
const Facilities = require('./domains/facilitiesmemory/modules/facilities');
const HD = require('@docbrasil/tools');

let facilities;
let newFacilityId;
let newItem = { name: 'New Item', description: 'New Item Description' };
let updItem = { name: 'New Item Updated', description: 'New Item Description Updated' };

describe('CRUDMemory Tests', function(done) {
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
    it('init (populating), DIRECT and count', function (done) {
        facilities.init();
        expect(facilities.crudmemory).is.not.undefined;
        expect(facilities.crudmemory.DIRECT().length).is.equal(100);
        expect(facilities.crudmemory.DIRECT()[0]._id).is.not.undefined;
        facilities.crudmemory.count((err, retData) => {
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).is.not.undefined;
            expect(retData.total).is.not.NaN;
            expect(facilities.crudmemory.DIRECT().length).is.equal(retData.total);
            done();
        });

    });

    it('create', function (done) {
        facilities.crudmemory.create({ item: newItem }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData._id).exist;
            expect(retData.name).to.be.equal(newItem.name);
            expect(retData.description).to.be.equal(newItem.description);
            newFacilityId = retData._id;
            done();
        });
    });

    it('findById', function (done) {
        facilities.crudmemory.findById({ id: newFacilityId }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData._id).exist;
            expect(retData._id).to.be.equal(newFacilityId);
            expect(retData.name).to.be.equal(newItem.name);
            expect(retData.description).to.be.equal(newItem.description);
            done();
        });
    });

    it('findByIdAndUpdate', function (done) {
        facilities.crudmemory.findByIdAndUpdate({ id: newFacilityId, updItem }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData._id).exist;
            expect(retData._id).to.be.equal(newFacilityId);
            expect(retData.name).to.be.equal(updItem.name);
            expect(retData.description).to.be.equal(updItem.description);
            done();
        });
    });

    it('find everything', function (done) {
        facilities.crudmemory.find({ query: {} }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(101);
            expect(retData.total).to.be.equal(101);
            expect(retData.total).to.be.equal(retData.results.length);
            let found = _.find(retData.results, { _id: newFacilityId });
            expect(found).is.not.undefined;
            expect(found).is.not.null;
            expect(found).is.not.empty;
            expect(found._id).to.be.equal(newFacilityId);
            expect(found.name).to.be.equal(updItem.name);
            expect(found.description).to.be.equal(updItem.description);
            done();
        });
    });

    it('find by name', function (done) {
        facilities.crudmemory.find({ query: { q: updItem.name } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(1);
            expect(retData.total).to.be.equal(1);
            expect(retData.total).to.be.equal(retData.results.length);
            expect(retData.results[0]._id).to.be.equal(newFacilityId);
            expect(retData.results[0].name).to.be.equal(updItem.name);
            expect(retData.results[0].description).to.be.equal(updItem.description);
            done();
        });
    });

    it('find and paginate', function (done) {
        facilities.crudmemory.find({ query: { limit: 10, offset: 1 } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(10);
            expect(retData.total).to.be.equal(101);
            expect(retData.results[0]._id).to.be.equal(newFacilityId);
            expect(retData.results[0].name).to.be.equal(updItem.name);
            expect(retData.results[0].description).to.be.equal(updItem.description);
            done();
        });
    });

    it('find with query and paginate', function (done) {
        facilities.crudmemory.find({ query: { q: 'Facility', limit: 10, offset: 1 } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(10);
            expect(retData.total).to.be.equal(100);
            expect(retData.results[0]._id).not.to.be.equal(newFacilityId);
            expect(retData.results[0].name).not.to.be.equal(updItem.name);
            expect(retData.results[0].description).not.to.be.equal(updItem.description);
            expect(retData.results[0].name.indexOf('Facility') !== -1).to.be.true;
            done();
        });
    });

    it('find by name check for callbacks', function (done) {
        facilities.crudmemory.find({ query: { q: updItem.name } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(1);
            expect(retData.total).to.be.equal(1);
            expect(retData.total).to.be.equal(retData.results.length);
            expect(retData.results[0]._id).to.be.equal(newFacilityId);
            expect(retData.results[0].name).to.be.equal(updItem.name);
            expect(retData.results[0].description).to.be.equal(updItem.description);
            expect(retData.callbacks).exist;
            expect(retData.callbacks).is.not.empty;
            expect(retData.callbacks.findValidate).is.true;
            expect(retData.callbacks.findBefore).is.true;
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
            expect(retData._id).exist;
            expect(retData._id).to.be.equal(newFacilityId);
            expect(retData.name).to.be.equal(updItem.name);
            expect(retData.description).to.be.equal(updItem.description);
            done();
        });
    });

    it('find everything again', function (done) {
        facilities.crudmemory.find({ query: undefined }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(100);
            expect(retData.total).to.be.equal(100);
            expect(retData.total).to.be.equal(retData.results.length);
            done();
        });
    });

    it('find and sort descending', function (done) {
        facilities.crudmemory.find({ query: { limit: 10, offset: 1, sortBy: 'name', sortOrder: 'DESC' } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(10);
            expect(retData.total).to.be.equal(100);

            _.each(retData.results, (facility, idx) => {
                let number = 99 - idx;
                expect(facility.name).to.be.equal(`Facility ${number}`);
            });

            done();
        });
    });

    it('find and sort ascending', function(done) {
        facilities.crudmemory.find({ query: { limit: 10, offset: 1, sortBy: 'name', sortOrder: 'ASC' } }, (err, retData) => {
            expect(facilities.crudmemory).is.not.undefined;
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.total).exist;
            expect(retData.results).exist;
            expect(retData.results.length).to.be.equal(10);
            expect(retData.total).to.be.equal(100);
            expect(retData.results[0].name).to.be.equal('Facility 0');
            expect(retData.results[9].name).to.be.equal('Facility 17');   //sorted alphanumerically
            done();
        });
    });
});
