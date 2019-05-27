const HD = require('@docbrasil/tools');
const expect = require('chai').expect;
const Path = require('path');
const FS = require('fs');

let pdf;

describe('Cache Tests', function() {
    before(function(done) {
        // runs before all tests in this block
        process.env.servertype = 'dev';
        HD.init({
            domains: require('../domains')
        });
        done();
    });

    it('Init', function (done) {
        HD.cache().init({
            connection: HD.serverconfig().redis,
            list: HD.serverconfig().cache
        });

        HD.cache().connect(() => {
            let PDF = HD.pdf();
            pdf = new PDF();
            done();
        });
    });

    it('Get Num pages', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '001.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        pdf.getInfoAndPage({ file: fileBase64 }, (err, retInfo) => {
            expect(err).to.be.null;
            expect(retInfo).to.not.be.empty;
            expect(retInfo.pages).to.be.equal(5);
            expect(retInfo.page).to.not.be.equal('');
            done();
        });
    });

    it('Get Num pages with high resolution', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '001.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        pdf.getInfoAndPage({ file: fileBase64, resolution: 600 }, (err, retInfo) => {
            expect(err).to.be.null;
            expect(retInfo).to.not.be.empty;
            expect(retInfo.pages).to.be.equal(5);
            expect(retInfo.page).to.not.be.equal('');
            done();
        });
    });

    it('Get Num pages with correct page number in one page PDF', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '004.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        pdf.getInfoAndPage({ file: fileBase64, page: 1 }, (err, retInfo) => {
            expect(err).to.be.null;
            expect(retInfo).to.not.be.empty;
            expect(retInfo.pages).to.be.equal(1);
            expect(retInfo.page).to.not.be.equal('');
            done();
        });
    });

    it('Get Num pages with wrong page number in one page PDF', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '004.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        pdf.getInfoAndPage({ file: fileBase64, page: 10 }, (err, retInfo) => {
            expect(err).to.be.null;
            expect(retInfo).to.not.be.empty;
            expect(retInfo.pages).to.be.equal(1);
            expect(retInfo.file).to.not.be.equal('');
            done();
        });
    });

    it('Get Num pages with correct page number in the middle of the pdf', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '001.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        pdf.getInfoAndPage({ file: fileBase64, page: 2 }, (err, retInfo) => {
            expect(err).to.be.null;
            expect(retInfo).to.not.be.empty;
            expect(retInfo.pages).to.be.equal(5);
            expect(retInfo.file).to.not.be.equal('');
            done();
        });
    });
});

