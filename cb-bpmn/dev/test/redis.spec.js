const expect = require('chai').expect;
const Mongo = require('../domains/helpers/modules/mongo');
const HD = require('@docbrasil/tools');

let Redis;
let redisCli;
let idGetSet = '12345678990:get:set';
let idGetSetObj = '12345678990:get:setObj';
let idGetSetEX = '12345678990:get:setEX';
let idGetSetObjEX = '12345678990:get:setObjEX';
let idHash = '12345678990:hash';

/**
 * NOTE: You have to have a local redis running to perform these tests.
 * You can run 'docker-compose up -d redis' to run the docker redis container
 */
describe('Redis Tests', function() {
    this.timeout(15000);

    before(function(done) {
        // runs before all tests in this block
        Mongo.setConfig({ host: 'mongodb://localhost/testdb' });
        Mongo.connect(() => {
            expect(Mongo.status()).is.equal(1); // connected
            Redis = require('../domains/helpers/modules/redis');
            redisCli = new Redis();
            redisCli.connect(function(err) {
                expect(err).to.not.be.ok;
                expect(redisCli.status).to.equal('ready');
                HD.init({
                    domains: require('../domains')
                });
                HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
                    done();
                });
            });
        });
    });

    it('should be ready', function(done) {
        redisCli.connect(function(err) {
            expect(err).to.not.be.ok;
            expect(redisCli.status).to.not.equal('disconnected');
            done();
        });
    });

    it('DIRECT and basic functions', function(done) {
        let client = redisCli.DIRECT();
        expect(client).to.be.defined;
        expect(client.SET).to.be.a('function');
        expect(client.GET).to.be.a('function');
        expect(client.HSET).to.be.a('function');
        expect(client.HGET).to.be.a('function');
        expect(client.DEL).to.be.a('function');
        done();
    });

    describe('Get and Set Operations', function() {
        it('set and get', function(done) {
            redisCli.set(idGetSet, 'Test Item');
            redisCli.get(idGetSet, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).not.to.be.empty;
                expect(retData).to.equal('Test Item');
                done();
            });
        });

        it('set and getObj', function(done) {
            let obj = { a: 1, b: 2, c: { item: [1, 2, 3] } };
            redisCli.setObj(idGetSetObj, obj);
            redisCli.getObj(idGetSetObj, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).not.to.be.empty;
                expect(retData).to.deep.equal(obj);
                done();
            });
        });

        it('setEX and get', function(done) {
            redisCli.setEX(idGetSetEX, 'Test Item', 1);
            setTimeout(function() {
                redisCli.get(idGetSetEX, function(err, retData) {
                    expect(err).to.be.null;
                    expect(retData).not.to.be.empty;
                    expect(retData).to.equal('Test Item');
                });
            }, 900);
            setTimeout(function() {
                redisCli.get(idGetSetEX, function(err, retData) {
                    expect(err).to.be.null;
                    expect(retData).to.be.null;
                    done();
                });
            }, 1001);
        });

        it('setObjEX and get', function(done) {
            let obj = { a: 1, b: 2, c: { item: [1, 2, 3] } };
            redisCli.setObjEX(idGetSetObjEX, obj, 1);
            setTimeout(function() {
                redisCli.getObj(idGetSetObjEX, function(err, retData) {
                    expect(err).to.be.null;
                    expect(retData).not.to.be.empty;
                    expect(retData).to.deep.equal(obj);
                });
            }, 900);
            setTimeout(function() {
                redisCli.getObj(idGetSetObjEX, function(err, retData) {
                    expect(err).to.be.null;
                    expect(retData).to.be.null;
                });
            }, 1001);
            setTimeout(function() {
                redisCli.get(idGetSetObjEX, function(err, retData) {
                    expect(err).to.be.null;
                    expect(retData).to.be.null;
                    done();
                });
            }, 1002);
        });
    });

    describe('Delete items', function() {
        it('del', function(done) {
            redisCli.del(idGetSet);
            redisCli.del(idGetSetObj);
            redisCli.del(idGetSetEX, function() {});
            redisCli.del(idGetSetObjEX, function() {});
            done();
        });

        it('get', function(done) {
            redisCli.get(idGetSet, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('getObj', function(done) {
            redisCli.getObj(idGetSetObj, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('get', function(done) {
            redisCli.get(idGetSetEX, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('getObj', function(done) {
            redisCli.getObj(idGetSetObjEX, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

    });

    describe('Hash Operations', function() {
        it('hset and hget', function(done) {
            redisCli.hset(idHash, 'myitem', 'Test Item');
            redisCli.hget(idHash, 'myitem', function(err, retData) {
                expect(err).to.be.null;
                expect(retData).not.to.be.empty;
                expect(retData).to.equal('Test Item');
                done();
            });
        });

        it('hsetObj and hgetObj', function(done) {
            let obj = { a: 1, b: 2, c: { item: [1, 2, 3] } };
            redisCli.hsetObj(idHash, 'myobj', obj);
            redisCli.hgetObj(idHash, 'myobj', function(err, retData) {
                expect(err).to.be.null;
                expect(retData).not.to.be.empty;
                expect(retData).to.deep.equal(obj);
                done();
            });
        });

        it('hdel', function(done) {
            redisCli.hdel(idHash, 'myobj');
            redisCli.hgetObj(idHash, 'myobj', function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('hdel with callback', function(done) {
            redisCli.hdel(idHash, 'myobj', function() {});
            redisCli.hgetObj(idHash, 'myobj', function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('del', function(done) {
            redisCli.hdel(idHash, 'myitem');
            redisCli.hgetObj(idHash, 'myitem', function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });

        it('check full del of idHash', function(done) {
            redisCli.get(idHash, function(err, retData) {
                expect(err).to.be.null;
                expect(retData).to.be.null;
                done();
            });
        });
    });

    describe('Connection tests', function() {
        it('quit', function(done) {
            redisCli.quit();
            setTimeout(function() {
                expect(redisCli.status).to.equal('disconnected');
                done();
            }, 20);
        });
    });
});


