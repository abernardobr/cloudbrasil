const Sinon = require('sinon');
const expect = require('chai').expect;

let utils;

describe('Utils Tests', () => {
    beforeEach(() => {
        utils = require('../domains/helpers/modules/utils');
    });

    it('should be defined', () => {
        expect(utils.server).to.be.defined;
        expect(utils.TOTimer).to.be.a('function');
        expect(utils.random).to.be.defined;
        expect(utils.mixin).to.be.defined;
    });

    describe('TOTimer Tests', () => {
        let timer;

        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
            timer = new utils.TOTimer({ customOption: 123 });
        });

        it('should create a timer', () => {
            expect(timer.options.customOption).to.equal(123);
            expect(timer.options.precision).to.equal(3);
            expect(timer.marks).to.be.empty;
            expect(timer.start).to.equal(0);
        });

        it('should init the timer', () => {
            timer.init();

            expect(timer.start).not.to.equal(0);
        });

        it('should mark a time', () => {
            //prepare
            timer.init();

            timer.mark('TAG');
            expect(timer.marks.length).to.equal(1);

            expect(timer.marks[0].tag).to.equal('TAG');
        });

        it('should mark multiple times', () => {
            //prepare
            timer.init();

            timer.mark('TAG');
            expect(timer.marks.length).to.equal(1);

            expect(timer.marks[0].tag).to.equal('TAG');

            timer.mark('TAG2');
            expect(timer.marks.length).to.equal(2);

            expect(timer.marks[1].tag).to.equal('TAG2');
        });
    });

    describe('Server Tests', () => {
        let server;

        let mockRequestBoom = {
            response: {
                isBoom: true,
                output: {
                    statusCode: 404
                }
            }
        };

        let mockRequest = {
            response: {
                isBoom: false,
                output: {
                    statusCode: 200
                },
                code: Sinon.spy()
            }
        };

        let mockReply = {
            view: Sinon.spy(),
            file: Sinon.spy(),
            continue: Sinon.spy()
        };

        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
            server = utils.server;
        });

        it('should process a view', () => {
            server.view(mockRequestBoom, mockReply, 'index', { context: true });

            expect(mockReply.view.calledWith('index', { context: true })).to.equal(true);
        });

        it('should continue if the view is not found', () => {
            server.view(mockRequest, mockReply, 'index', { context: true });

            expect(mockReply.continue.called).to.equal(true);
        });

        it('should process a file', () => {
            server.file(mockRequestBoom, mockReply, 'index.html');

            expect(mockReply.file.calledWith('index.html')).to.equal(true);
        });

        it('should continue if the file is not found', () => {
            server.file(mockRequest, mockReply, 'index.html');

            expect(mockReply.continue.called).to.equal(true);
        });

        it('should respond with retData', () => {
            let replyStub = Sinon.stub();
            replyStub.returns(mockRequest.response);

            server.respond(mockRequest, replyStub, undefined, { data: 'retData' });

            expect(replyStub.calledWith(undefined, { data: 'retData' })).to.equal(true);
            expect(mockRequest.response.code.called).to.equal(true);
            expect(mockRequest.response.code.calledWith(200)).to.equal(true);
        });
    });

    describe('Random Tests', () => {
        let random;

        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
            random = utils.random;
        });

        it('should generate a guid section', () => {
            let guid = random.S4();

            expect(guid).to.be.defined;
            expect(guid.length).to.equal(4);
        });

        it('should generate a pseudo-GUID', () => {
            let guid = random.guid();

            expect(guid).to.be.defined;
            expect(guid.length).to.equal(32);
        });

        it('should generate a pseudo-GUID with a separator', () => {
            let sep = '-';
            let guid = random.guid(sep);

            expect(guid).to.be.defined;
            expect(guid.length).to.equal(36);

            let sections = guid.split(sep);
            expect(sections.length).to.equal(5);
        });
    });

    describe('Mixin Tests', () => {
        let mixin;

        class Base {

        }

        class MixOne {
            mixFuncOne() {
                return 'one';
            }
            mixFuncTwo() {
            }
        }

        class MixTwo {
            mixFuncThree() {
            }
            mixFuncFour() {
            }
            mixFuncOne() {
                return 'two';
            }
        }

        const MixThree = {
            mixFuncObj: function() {}
        };


        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
            mixin = utils.mixin;
        });

        it('should mix class functions with an instance', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne);

            expect(base.mixFuncOne).to.be.defined;
        });

        it('should mix multple class functions with an instance', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne);

            expect(base.mixFuncOne).to.be.defined;
            expect(base.mixFuncTwo).to.be.defined;
        });

        it('should mix multple classes with an instance', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne, MixTwo);

            expect(base.mixFuncOne).to.be.defined;
            expect(base.mixFuncTwo).to.be.defined;
            expect(base.mixFuncThree).to.be.defined;
            expect(base.mixFuncFour).to.be.defined;
        });

        it('should mix multple classes with an instance', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne, MixTwo);

            expect(base.mixFuncOne).to.be.defined;
            expect(base.mixFuncTwo).to.be.defined;
            expect(base.mixFuncThree).to.be.defined;
            expect(base.mixFuncFour).to.be.defined;
        });

        it('should use the rightmost implementation in the event of a duplicate', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne, MixTwo);

            expect(base.mixFuncOne()).to.equal('two');
        });

        it('should mix classes and objects', () => {
            let base = new Base();

            expect(base).to.be.empty;

            mixin(base, MixOne, MixTwo, MixThree);

            expect(base.mixFuncObj).to.be.defined;
        });
    });

    describe('Sanitize Tests', () => {

        const aStrsToTest = require('./helper/stringsToSaniteze.js');
        const aSanitizeStrings = require('./helper/stringsSanitized.js');

        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
        });

        it('test all strings to sanitize', () => {
            for(let i = 0; i < aStrsToTest.length; i++) {
                expect(aSanitizeStrings[i]).to.equal(utils.sanitize.string(aStrsToTest[i]));
            }
        });

        it('test objects to sanitize', () => {
            let obj = {
                xssString: '<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>',
                legitimateString: '<script>Preserve this</script>',
                normalString: 'Preserve this',
                subobj: {
                    xssString: '<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>',
                    legitimateString: '<script>Preserve this</script>',
                    normalString: 'Preserve this',
                },
                aItem: ['<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>', '<script>Preserve this</script>', 'Preserve this']
            };

            let objSanitezed = utils.sanitize.object(obj, { skip: ['legitimateString'] });
            expect(objSanitezed.xssString).to.not.equal('<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>');
            expect(objSanitezed.legitimateString).to.equal('<script>Preserve this</script>');
            expect(objSanitezed.normalString).to.equal('Preserve this');
            expect(objSanitezed.subobj.xssString).to.not.equal('<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>');
            expect(objSanitezed.subobj.legitimateString).to.equal('<script>Preserve this</script>');
            expect(objSanitezed.subobj.normalString).to.equal('Preserve this');
            expect(objSanitezed.aItem[0]).to.equal('');
            expect(objSanitezed.aItem[1]).to.equal('');
            expect(objSanitezed.aItem[2]).to.equal('Preserve this');
        });
    });

    describe('Format', () => {
        beforeEach(() => {
            utils = require('../domains/helpers/modules/utils');
        });

        it('prepareIdCard', (done) => {
            let idCard = utils.format.prepareIdCard('061.716.678-11');
            expect(idCard).to.be.equal('06171667811');
            idCard = utils.format.prepareIdCard('06171667811');
            expect(idCard).to.be.equal('06171667811');
            idCard = utils.format.prepareIdCard('061716*&$#@!*())+-><,.?/`~67811');
            expect(idCard).to.be.equal('06171667811');
            done();
        });

        it('should format to camel case', () => {
            expect(utils.format.firstUpper('AP256')).to.equal('Ap256');
            expect(utils.format.firstUpper('ASEUDO')).to.equal('Aseudo');
            expect(utils.format.firstUpper('AL87')).to.equal('Al87');
            expect(utils.format.firstUpper('AL87MASTER')).to.equal('Al87master');
            expect(utils.format.firstUpper('AL MASTER')).to.equal('Al Master');
            expect(utils.format.firstUpper('testcase')).to.equal('Testcase');
            expect(utils.format.firstUpper('AL MASTER')).to.equal('Al Master');
            expect(utils.format.firstUpper('first Word Lower')).to.equal('First Word Lower');
            expect(utils.format.firstUpper('all words lower')).to.equal('All Words Lower');
            expect(utils.format.firstUpper('TRY56 this Case')).to.equal('Try56 This Case');
            expect(utils.format.firstUpper('%test random76')).to.equal('%Test Random76');
            expect(utils.format.firstUpper('MIDWAY^% case')).to.equal('Midway^% Case');
            expect(utils.format.firstUpper('Táãü>?<kL@')).to.equal('Táãü>?<kl@');
        });
    });

    describe('Password', function() {
        this.timeout(15000);
        beforeEach(function() {
            utils = require('../domains/helpers/modules/utils');
        });

        it('hash and compare', function(done) {
            let password = 'TtestT03';
            let hashPass = utils.password.hash(password);
            let isSame = utils.password.compare(password, hashPass);
            expect(isSame).to.be.true;
            done();
        });

        it('create', function(done) {
            let passInfo = utils.password.create();
            let isSame = utils.password.compare(passInfo.password, passInfo.hash);
            expect(isSame).to.be.true;
            done();
        });
    });

    // describe('Tree', function() {
    //     let tree;
    //     beforeEach(function() {
    //         utils = require('../domains/helpers/modules/utils');
    //         tree = new utils.tree();
    //     });
    //
    //     it('hash and compare', function(done) {
    //         done();
    //     });
    //
    //     it('create', function(done) {
    //         done();
    //     });
    // });
});
