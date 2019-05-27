const HD = require('@docbrasil/tools');
const expect = require('chai').expect;

let sessionId;
let session;
let mockUser;
let newExpire;
let mockRequest = { auth: {} };
let mockRequestOptional = { auth: { mode: 'optional' } };
let mockSession = { id: '', username: 'abernardo', userId: '' };

process.env.servertype = 'dev';

describe('Session Tests', function() {
    this.timeout(5000);
    before(function(done) {
        // runs before all tests in this block
        let serverConfig = require('../config');
        HD.init({
            domains: require('../domains')
        });
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
        HD.cache().connect(() => {
            HD.init({
                domains: require('../domains')
            });
            HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
                done();
            });
        });
    });

    it('Init session and set', function (done) {
        session = require('../domains/session/modules/session');
        session.set(sessionId, mockUser, function(err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('Get session', function (done) {
        session.get(sessionId, function(err, retUser) {
            expect(err).to.be.null;
            expect(retUser).to.not.be.empty;
            expect(retUser._id).to.be.equal(mockUser._id);
            expect(retUser.name).to.be.equal(mockUser.name);
            done();
        });
    });

    it('Drop session', function (done) {
        session.drop(sessionId);
        done();
    });

    it('Get session after drop', function (done) {
        session.get(sessionId, function(err, retUser) {
            expect(err).to.be.null;
            expect(retUser).to.be.null;
            done();
        });
    });

    it('Set session again', function (done) {
        session.set(sessionId, mockUser, function(err) {
            expect(err).to.be.null;
            mockSession.id = sessionId;
            mockSession.userId = mockUser._id;
            mockSession.username = mockUser.username;
            done();
        });
    });

    it('Get session TTL', function (done) {
        HD.cache().DIRECT().DIRECT().TTL(`boaoferta:session:${sessionId}`, function(err, retData) {
            expect(err).to.be.null;
            expect(retData).to.not.equal(-2);
            expect(retData).to.not.equal(-1);
            expect(retData).to.equal(3600);
            done();
        });
    });

    it('Wait TTL', function (done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    it('Get session TTL', function (done) {
        HD.cache().DIRECT().DIRECT().TTL(`boaoferta:session:${sessionId}`, function(err, retData) {
            expect(err).to.be.null;
            expect(retData).to.not.equal(-2);
            expect(retData).to.not.equal(-1);
            expect(retData).to.not.equal(3600);
            newExpire = retData;
            done();
        });
    });

    it('Wait TTL', function (done) {
        setTimeout(function() {
            done();
        }, 2000);
    });

    it('Expire session', function (done) {
        session.expire(sessionId);
        done();
    });


    it('Get session TTL', function (done) {
        HD.cache().DIRECT().DIRECT().TTL(`boaoferta:session:${sessionId}`, function(err, retData) {
            expect(err).to.be.null;
            expect(retData).to.not.equal(-2);
            expect(retData).to.not.equal(-1);
            expect(retData > newExpire).to.true;
            done();
        });
    });

    it('Validate Bad Session', function (done) {
        session.validate({}, mockRequest, function(err, valid, retSession) {
            expect(err).to.be.null;
            expect(retSession).to.be.undefined;
            expect(valid).to.be.false;
            done();
        });
    });

    it('Validate', function (done) {
        session.validate(mockSession, mockRequest, function(err, valid, retSession) {
            expect(err).to.be.null;
            expect(valid).to.be.true;
            expect(retSession).to.not.be.empty;
            expect(retSession.username).to.be.equal(mockSession.username);
            expect(retSession.userId).to.be.equal(mockSession.userId);
            expect(retSession.id).to.be.equal(mockSession.id);
            expect(retSession.username).to.be.equal(mockUser.username);
            expect(retSession.userId).to.be.equal(mockUser._id);
            done();
        });
    });

    it('Validate Optional', function (done) {
        let badSession = { id: HD.utils().random.guid(), username: 'abernardo', userId: HD.utils().random.guid() };
        session.validate(badSession, mockRequestOptional, function(err, valid, retSession) {
            expect(err).to.be.null;
            expect(valid).to.be.true;
            expect(retSession).to.not.be.empty;
            expect(retSession.username).to.be.equal(badSession.username);
            expect(retSession.userId).to.be.equal(badSession.userId);
            expect(retSession.id).to.be.equal(badSession.id);
            done();
        });
    });

    it('Invalid Session', function (done) {
        let badSession = { id: HD.utils().random.guid(), username: 'abernardo', userId: HD.utils().random.guid() };
        session.validate(badSession, mockRequest, function(err, valid, retSession) {
            expect(err).to.be.null;
            expect(valid).to.be.false;
            expect(retSession).to.be.null;
            done();
        });
    });
});
