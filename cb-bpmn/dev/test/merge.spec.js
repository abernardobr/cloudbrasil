const HD = require('@docbrasil/tools');
const expect = require('chai').expect;
const Path = require('path');
const FS = require('fs');
const Async = require('async');

let merge;
let aAddedFiles = [];

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
            let Merge = HD.merge();
            merge = new Merge();
            done();
        });
    });

    it('Add file 1', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '001.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'application/pdf' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 2', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '002.png');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'image/png' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 3', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '003.jpg');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'image/jpg' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 4', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '004.pdf');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'application/pdf' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 5', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '005.docx');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 6', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '006.xlsx');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Add file 6', function (done) {
        let fileName = Path.join(__dirname, './mergefiles/', '007.pptx');
        let readFile = FS.readFileSync(fileName);
        let fileBase64 = new Buffer(readFile).toString('base64');
        merge.addFile({ file: fileBase64, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.presentation' }, (err, retFileInfo) => {
            expect(err).to.be.null;
            expect(retFileInfo).to.not.be.empty;
            expect(retFileInfo.id).to.not.be.undefined;
            aAddedFiles.push(retFileInfo.id);
            done();
        });
    });

    it('Generate file as stream', function (done) {
        merge.execute({ files: aAddedFiles }, (err, retPDFStream) => {
            expect(err).to.be.null;
            expect(retPDFStream).to.not.be.undefined;
            expect(retPDFStream).to.not.be.null;
            done();
        });
    });

    it('Remove files', function (done) {
        merge.deleteFiles(aAddedFiles, (err) => {
            expect(err).to.be.null;
            done();
        });
    });
});

