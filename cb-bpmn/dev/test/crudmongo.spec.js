const _ = require('lodash');
const expect = require('chai').expect;
const Mongo = require('../domains/helpers/modules/mongo');
const Facilities = require('./domains/facilitiesmongo/modules/facilities');
const HD = require('@docbrasil/tools');

let facilities;
let newFacilityId;
let newItem = { name: 'New Item', description: 'New Item Description' };
let updItem = { name: 'New Item Updated', description: 'New Item Description Updated' };

describe('CRUDMongo Tests', function() {
    before(function(done) {
        // runs before all tests in this block
        facilities = new Facilities();
        Mongo.setConfig({ host: 'mongodb://localhost/testdb' });
        Mongo.connect(() => {
            expect(Mongo.status()).is.equal(1); // connected
            HD.init({
                domains: require('../domains')
            });
            HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
                done();
            });
        });
    });

    describe('Initalizations', function() {
        it('create schema', function(done) {
            let schema = {
                name: { type: String, required: true, index: true },
                description: { type: String }
            };
            facilities.crudmongo.setSchema(schema);
            const paths = facilities.crudmongo._mongoSchema.paths;
            expect(paths._id).to.not.be.undefined;
            expect(paths._id.path).to.be.equal('_id');
            expect(paths._id.instance).to.be.equal('ObjectID');
            expect(paths.name).to.not.be.undefined;
            expect(paths.name.path).to.be.equal('name');
            expect(paths.name.instance).to.be.equal('String');
            expect(paths.name.isRequired).to.be.equal(true);
            expect(paths.description).to.not.be.undefined;
            expect(paths.description.path).to.be.equal('description');
            expect(paths.description.instance).to.be.equal('String');
            expect(paths.description.isRequired).to.be.undefined;
            done();
        });

        it('create indexes', function(done) {
            let idxs = [
                { type: { '$**': 'text' }, options: { name: 'stringFields',  'default_language': 'portuguese', 'language_override': 'language' } }
            ];
            facilities.crudmongo.createIndexes(idxs);
            const paths = facilities.crudmongo._mongoSchema.paths;
            expect(paths._id).to.not.be.undefined;
            expect(paths._id.path).to.be.equal('_id');
            expect(paths._id.instance).to.be.equal('ObjectID');
            expect(paths.name).to.not.be.undefined;
            expect(paths.name.path).to.be.equal('name');
            expect(paths.name.instance).to.be.equal('String');
            expect(paths.name.isRequired).to.be.equal(true);
            expect(paths.name._index).to.be.equal(true);
            expect(paths.description).to.not.be.undefined;
            expect(paths.description.path).to.be.equal('description');
            expect(paths.description.instance).to.be.equal('String');
            expect(paths.description.isRequired).to.be.undefined;
            let idx = facilities.crudmongo._mongoSchema._indexes[0];
            expect(idx[0]['$**']).to.be.equal('text');
            expect(idx[1]['name']).to.be.equal('stringFields');
            expect(idx[1]['default_language']).to.be.equal('portuguese');
            expect(idx[1]['language_override']).to.be.equal('language');
            done();
        });

        it('creates de model', function(done) {
            facilities.crudmongo.createModel();
            expect(facilities.crudmongo._model).to.not.be.undefined;
            expect(facilities.crudmongo._model).to.not.be.null;
            done();
        });

        it('remove the collection', function(done) {
            expect(facilities.crudmongo).is.not.undefined;
            Mongo.dropCollection('facilities', (err, retData) => {
                if (err) {
                    expect(err).is.not.undefined;

                } else {
                    expect(err).is.null;
                    expect(retData).is.not.undefined;
                    expect(retData).is.not.empty;
                    expect(retData).to.be.true;
                }
                done();
            });
        });
    });

    describe('Operations', function() {

        before(function(done) {
            facilities.crudmongo.DIRECT().remove({}, (err, retData) => {
                expect(retData.result.ok).to.equal(1);
                let aItems = [];
                _.times(100, (key) => {
                    aItems.push({ name: `Facility ${key}`, description: `Facility Description ${key}`});
                });
                facilities.crudmongo.populate(aItems, (err, retData) => {
                    expect(facilities.crudmongo).is.not.undefined;
                    expect(err).is.null;
                    expect(retData).is.not.undefined;
                    expect(retData).is.not.empty;
                    expect(retData.length).is.equal(100);
                    done();
                });
            });
        });

        it('create', function (done) {
            facilities.crudmongo.create({ item: newItem }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.name).is.equal(newItem.name);
                expect(retData.description).is.equal(newItem.description);
                expect(retData._id).is.not.undefined;
                expect(retData._id).is.not.null;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.createValidate).is.true;
                expect(retData.callbacks.createBefore).is.true;
                expect(retData.callbacks.createAfter).is.true;
                newFacilityId = retData._id;
                done();
            });
        });

        it('findById', function (done) {
            facilities.crudmongo.findById({ id: newFacilityId }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.name).is.equal(newItem.name);
                expect(retData.description).is.equal(newItem.description);
                expect(retData._id.toString()).is.equal(newFacilityId.toString());
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findByIdValidate).is.true;
                expect(retData.callbacks.findByIdBefore).is.true;
                expect(retData.callbacks.findByIdAfter).is.true;
                done();
            });
        });

        it('findByIdAndUpdate', function (done) {
            facilities.crudmongo.findByIdAndUpdate({ id: newFacilityId, updItem, options: { new: true } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData._id).exist;
                expect(retData._id.toString()).to.be.equal(newFacilityId.toString());
                expect(retData.name).to.be.equal(updItem.name);
                expect(retData.description).to.be.equal(updItem.description);
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findByIdAndUpdateValidate).is.true;
                expect(retData.callbacks.findByIdAndUpdateBefore).is.true;
                expect(retData.callbacks.findByIdAndUpdateAfter).is.true;
                done();
            });
        });

        it('find everything', function (done) {
            facilities.crudmongo.find({ query: { s: { _id: -1 } }, noLimit: true }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(101);
                expect(retData.total).to.be.equal(101);
                expect(retData.total).to.be.equal(retData.results.length);
                let found = _.find(retData.results, (item) => { return item._id.toString() === newFacilityId.toString(); });
                expect(found).is.not.undefined;
                expect(found).is.not.null;
                expect(found).is.not.empty;
                expect(found._id.toString()).to.be.equal(newFacilityId.toString());
                expect(found.name).to.be.equal(updItem.name);
                expect(found.description).to.be.equal(updItem.description);
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('try to find everythingm return limit', function (done) {
            facilities.crudmongo.find({ query: {} }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
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

        it('find by name with projection query', function (done) {
            facilities.crudmongo.find({ query: { q: { name: updItem.name }, p: { name: 1 }, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(1);
                expect(retData.total).to.be.equal(1);
                expect(retData.total).to.be.equal(retData.results.length);
                expect(retData.results[0]._id.toString()).to.be.equal(newFacilityId.toString());
                expect(retData.results[0].name).to.be.equal(updItem.name);
                expect(retData.results[0].description).to.undefined;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find by name with projection parameter', function (done) {
            facilities.crudmongo.find({  projection: { name: 1 }, query: { q: { name: updItem.name }, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(1);
                expect(retData.total).to.be.equal(1);
                expect(retData.total).to.be.equal(retData.results.length);
                expect(retData.results[0]._id.toString()).to.be.equal(newFacilityId.toString());
                expect(retData.results[0].name).to.be.equal(updItem.name);
                expect(retData.results[0].description).to.undefined;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find and paginate with sort', function (done) {
            facilities.crudmongo.find({ query: { limit: 10, offset: 1, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(10);
                expect(retData.total).to.be.equal(101);
                expect(retData.results[0]._id.toString()).to.be.equal(newFacilityId.toString());
                expect(retData.results[0].name).to.be.equal(updItem.name);
                expect(retData.results[0].description).to.be.equal(updItem.description);
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find with query and paginate with sort', function (done) {
            facilities.crudmongo.find({ query: { q: { name: /facility/i }, limit: 10, offset: 1, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(10);
                expect(retData.total).to.be.equal(100);
                expect(retData.results[0]._id.toString()).not.to.be.equal(newFacilityId.toString());
                expect(retData.results[0].name).not.to.be.equal(updItem.name);
                expect(retData.results[0].description).not.to.be.equal(updItem.description);
                expect(retData.results[0].name.indexOf('Facility') !== -1).to.be.true;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find by name', function (done) {
            facilities.crudmongo.find({ query: { q: { name: updItem.name } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(1);
                expect(retData.total).to.be.equal(1);
                expect(retData.total).to.be.equal(retData.results.length);
                expect(retData.callbacks).exist;
                expect(retData.callbacks).is.not.empty;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('do not find', function (done) {
            facilities.crudmongo.find({ query: { q: { name: 'foo' } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(0);
                expect(retData.total).to.be.equal(0);
                expect(retData.total).to.be.equal(retData.results.length);
                expect(retData.callbacks).exist;
                expect(retData.callbacks).is.not.empty;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('do not find with query and paginate', function (done) {
            facilities.crudmongo.find({ query: { q: { name: 'foo' }, limit: 10, offset: 1, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(0);
                expect(retData.total).to.be.equal(0);
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find with query and paginate to 3 page', function (done) {
            facilities.crudmongo.find({ query: { limit: 10, offset: 3, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(10);
                expect(retData.total).to.be.equal(101);
                expect(retData.results[0].name).to.be.equal('Facility 80');
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('count all', function(done) {
            facilities.crudmongo.count((err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).exist;
                expect(retData).to.be.equal(101);
                expect(retData.callbacks).is.undefined;
                done();
            });
        });

        it('count new item', function(done) {
            facilities.crudmongo.count({ q: { _id: newFacilityId } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).exist;
                expect(retData).to.be.equal(1);
                expect(retData.callbacks).is.undefined;
                done();
            });
        });

        it('findByIdAndRemove', function (done) {
            facilities.crudmongo.findByIdAndRemove({ id: newFacilityId.toString() }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData._id).exist;
                expect(retData._id.toString()).to.be.equal(newFacilityId.toString());
                expect(retData.name).to.be.equal(updItem.name);
                expect(retData.description).to.be.equal(updItem.description);
                expect(retData.callbacks).exist;
                expect(retData.callbacks).is.not.empty;
                expect(retData.callbacks.findByIdAndRemoveValidate).is.true;
                expect(retData.callbacks.findByIdAndRemoveBefore).is.true;
                expect(retData.callbacks.findByIdAndRemoveAfter).is.true;
                done();
            });
        });

        it('find everything again', function (done) {
            facilities.crudmongo.find({ query: undefined }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
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

        it('create with array', function (done) {
            facilities.crudmongo.create({ item: [newItem, newItem] }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.length).is.equal(2);
                expect(retData[0].name).to.be.equal('New Item');
                expect(retData[1].name).to.be.equal('New Item');
                expect(retData[0]._id).exist;
                expect(retData[1]._id).exist;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.createValidate).is.true;
                expect(retData.callbacks.createBefore).is.true;
                expect(retData.callbacks.createAfter).is.true;
                done();
            });
        });

        it('do not find with query and paginate to 3 page', function (done) {
            facilities.crudmongo.find({ query: { q: { name: 'foo' }, limit: 10, offset: 3, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(0);
                expect(retData.total).to.be.equal(0);
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });

        it('find smaller total then limit with query and paginate to 3 page', function (done) {
            facilities.crudmongo.find({ query: { q: { name: 'New Item' }, limit: 10, offset: 3, s: { _id: -1 } } }, (err, retData) => {
                expect(facilities.crudmongo).is.not.undefined;
                expect(err).is.null;
                expect(retData).is.not.undefined;
                expect(retData).is.not.empty;
                expect(retData.total).exist;
                expect(retData.results).exist;
                expect(retData.results.length).to.be.equal(2);
                expect(retData.total).to.be.equal(2);
                expect(retData.results[0].name).to.be.equal('New Item');
                expect(retData.results[1].name).to.be.equal('New Item');
                expect(retData.results[0]._id).exist;
                expect(retData.results[1]._id).exist;
                expect(retData.callbacks).is.not.null;
                expect(retData.callbacks.findValidate).is.true;
                expect(retData.callbacks.findBefore).is.true;
                expect(retData.callbacks.findAfter).is.true;
                done();
            });
        });
    });
});
