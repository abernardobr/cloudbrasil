const HD = require('@docbrasil/tools');
const expect = require('chai').expect;

let serverConfig ;
let sessionId;
let mockUser;
let mockUser2;
let cacheId = 'session';
let cacheKey = '1234';
let listKey1 = 'abcd';
let listKey2 = '4321';

describe('Cache Tests', function() {
    before(function(done) {
        // runs before all tests in this block
        process.env.servertype = 'dev';
        serverConfig = require('../config');
        HD.init({
            domains: require('../domains')
        });
        HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
            done();
        });
    });

    it('Init', function (done) {
        HD.cache().init({
            connection: serverConfig.redis,
            list: serverConfig.cache
        });
        sessionId = HD.utils().random.guid();
        mockUser = {
            _id: HD.utils().random.guid(),
            username: 'abernardo',
            name: 'Augusto Pissarra'
        };

        mockUser2 = {
            _id: HD.utils().random.guid(),
            username: 'abernardo2',
            name: 'Augusto Pissarra2'
        };

        HD.cache().connect(() => {
            done();
        });
    });

    it('Check Ready Status', function (done) {
        HD.cache().connect(function(err) {
            expect(err).to.not.be.ok;
            expect(HD.cache().status()).to.be.equal('ready');
            done();
        });
    });

    it('set and get', function (done) {
        HD.cache().set(cacheId, cacheKey, mockUser);
        HD.cache().get(cacheId, cacheKey, (err, retData) => {
            expect(retData._id).to.be.equal(mockUser._id);
            expect(retData.username).to.be.equal(mockUser.username);
            expect(retData.name).to.be.equal(mockUser.name);
        });
        done();
    });

    it('del and get', function (done) {
        HD.cache().del(cacheId, cacheKey);
        HD.cache().get(cacheId, cacheKey, (err, retData) => {
            expect(err).to.be.null;
            expect(retData).to.be.null;
        });
        done();
    });

    it('set, expire and get', function (done) {
        HD.cache().set(cacheId, cacheKey, mockUser);
        HD.cache().expire(cacheId, cacheKey);
        HD.cache().get(cacheId, cacheKey, (err, retData) => {
            expect(err).to.be.null;
            expect(retData._id).to.be.equal(mockUser._id);
            expect(retData.username).to.be.equal(mockUser.username);
            expect(retData.name).to.be.equal(mockUser.name);
        });
        done();
    });

    it('Check TTL', function (done) {
        HD.cache().DIRECT().DIRECT().TTL(`boaoferta:${cacheId}:${cacheKey}`, (err, retData) => {
            expect(err).to.be.null;
            expect(retData).to.be.above(3500);
            done();
        });
    });

    it('del and get', function (done) {
        HD.cache().del(cacheId, cacheKey);
        HD.cache().get(cacheId, cacheKey, (err, retData) => {
            expect(err).to.be.null;
            expect(retData).to.be.null;
        });
        done();
    });

    it('List set and get 1', function (done) {
        HD.cache().list.set(cacheId, cacheKey, listKey1, mockUser);
        HD.cache().list.get(cacheId, cacheKey, listKey1, (err, retData) => {
            expect(err).to.be.null;
            expect(retData._id).to.be.equal(mockUser._id);
            expect(retData.username).to.be.equal(mockUser.username);
            expect(retData.name).to.be.equal(mockUser.name);
        });
        done();
    });

    it('List set and get 2', function (done) {
        HD.cache().list.set(cacheId, cacheKey, listKey2, mockUser2);
        HD.cache().list.get(cacheId, cacheKey, listKey2, (err, retData) => {
            expect(err).to.be.null;
            expect(retData._id).to.be.equal(mockUser2._id);
            expect(retData.username).to.be.equal(mockUser2.username);
            expect(retData.name).to.be.equal(mockUser2.name);
        });
        done();
    });

    it('List del and get 1', function (done) {
        HD.cache().list.del(cacheId, cacheKey, listKey2);
        HD.cache().list.get(cacheId, cacheKey, listKey2, (err, retData) => {
            expect(err).to.be.null;
            expect(err).to.be.null;
            expect(retData).to.be.null;
        });
        done();
    });

    it('List set and get 2', function (done) {
        HD.cache().list.set(cacheId, cacheKey, listKey1, mockUser);
        HD.cache().list.get(cacheId, cacheKey, listKey1, (err, retData) => {
            expect(err).to.be.null;
            expect(retData._id).to.be.equal(mockUser._id);
            expect(retData.username).to.be.equal(mockUser.username);
            expect(retData.name).to.be.equal(mockUser.name);
        });
        done();
    });

    it('List del all and get 3', function (done) {
        HD.cache().del(cacheId, cacheKey);
        HD.cache().list.get(cacheId, cacheKey, listKey1, (err, retData) => {
            expect(err).to.be.null;
            expect(retData).to.be.null;
        });
        done();
    });
});

