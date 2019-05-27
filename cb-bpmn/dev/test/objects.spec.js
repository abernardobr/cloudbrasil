const HD = require('@docbrasil/tools');
const expect = require('chai').expect;
const Mongo = require('../domains/helpers/modules/mongo');

let serverConfig;

describe('Objects Tests', function() {
    before(function(done) {
        // runs before all tests in this block
        process.env.servertype = 'dev';
        serverConfig = require('../config');
        HD.init({
            domains: require('../domains')
        });
        HD.cache().init({
            connection: serverConfig.redis,
            list: serverConfig.cache
        });
        Mongo.setConfig({ host: 'mongodb://localhost/testdb' });
        Mongo.connect(() => {
            expect(Mongo.status()).is.equal(1); // connected
            HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
                done();
            });
        });
    });

    describe('Init Objects', function() {
        it('Remove All Objects', function (done) {
            HD.objects().crudmongo.DIRECT().remove({}, (err, data) => {
                expect(err).to.be.null;
                done()
            });
        });

        it('Add All Objects', function (done) {
            HD.initobjects().populate((err, data) => {
                expect(err).to.be.null;
                done()
            });
        });
    });

    describe('test get the objects', function() {
        it('get the objects unlogged', function (done) {
            let options = {
                request: {
                    source: 'api'
                },
                query: {},
                payload: { where: HD.objects().where.SITE },
                noLimit: true
            };

            HD.objects().crudmongo.find(options, function(err, data) {
                expect(err).to.be.null;
                expect(data).to.not.be.empty;
                expect(data.count).to.exist;
                expect(data.items).to.exist;
                expect(data.menus).to.exist;
                expect(data.urls).to.exist;
                done();
            });
        });
    });
});

