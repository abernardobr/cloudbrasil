const HD = require('@docbrasil/tools');
const expect = require('chai').expect;
const _ = require('lodash');
const Mongo = require('../domains/helpers/modules/mongo');

let logger;

describe('Log Tests', function() {
    before(function(done) {
        // runs before all tests in this block
        Mongo.setConfig({ host: 'mongodb://localhost/testdb' });
        Mongo.connect(() => {
            expect(Mongo.status()).is.equal(1); // connected
            HD.init({
                domains: require('../domains')
            });
            logger = require('../domains/helpers/modules/log');
            done();
        });
    });

    describe('Service1 Tests', function() {
        it('should create the logger', function(done) {
            logger.init('Service1', (err, aTransports) => {
                expect(err).to.be.null;
                expect(aTransports).to.be.ok;
                expect(aTransports.length > 0).to.be.true;
                expect(logger.getService()).to.be.equal('Service1');
                done();
            });
        });

        it('Error', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Error');
                expect(level).to.be.equal('error');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Error');
                expect(meta.content.info).to.be.equal('Error');
                expect(meta.severity).to.be.equal('error');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.ok;
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.error('Error', { content: { info: 'Error' } });
        });

        it('Warn', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Warn');
                expect(level).to.be.equal('warn');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Warn');
                expect(meta.content.info).to.be.equal('Warn');
                expect(meta.severity).to.be.equal('warn');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.ok;
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.warn('Warn', { content: { info: 'Warn' } });
        });

        it('Info', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Info');
                expect(level).to.be.equal('info');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Info');
                expect(meta.content.info).to.be.equal('Info');
                expect(meta.severity).to.be.equal('info');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.equal('');
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.info('Info', { content: { info: 'Info' } });
        });

        it('Verbose', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Verbose');
                expect(level).to.be.equal('verbose');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Verbose');
                expect(meta.content.info).to.be.equal('Verbose');
                expect(meta.severity).to.be.equal('verbose');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.ok;
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.verbose('Verbose', { content: { info: 'Verbose' } });
        });

        it('Debug', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Debug');
                expect(level).to.be.equal('debug');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Debug');
                expect(meta.content.info).to.be.equal('Debug');
                expect(meta.severity).to.be.equal('debug');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.ok;
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.debug('Debug', { content: { info: 'Debug' } });
        });

        it('Silly', function(done) {
            let count = 0;
            logger.on('logging', function (transport, level, msg, meta) {
                expect(transport).to.be.ok;
                expect(transport.name).to.be.ok;
                expect(msg).to.be.equal('Silly');
                expect(level).to.be.equal('silly');
                expect(meta['@timestamp']).to.be.ok;
                expect(meta.correlationKey).to.be.ok;
                expect(meta.message).to.be.equal('Silly');
                expect(meta.content.info).to.be.equal('Silly');
                expect(meta.severity).to.be.equal('silly');
                expect(meta.service).to.be.equal('Service1');
                expect(meta.stack).to.be.equal('');
                if(transport.name === 'console') {
                    count++;
                }

                if(transport.name === 'mongodb') {
                    count++;
                }

                if(count === 2) {
                    logger.removeAllListeners();
                    done();
                }
            });
            logger.silly('Silly', { content: { info: 'Silly' } });
        });
    });
});
