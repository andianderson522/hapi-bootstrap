'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var logger = require('../../../logger/accessLog');
var stream = require('../../../logger/accessLog').stream;

describe('Access Logging setup', function describeAccessLoggingSuite() {
  after(function cleanupTtest() {
    logger.debug('complete');
  });
  it('test logger setup', function testLoggerConfiguration(done) {
    expect(logger).to.exist;
    var transports = logger.transports;
    expect(transports).to.exist;
    var file = transports.file;
    expect(file).to.exist;
    expect(file.level).to.equal('info');
    expect(file.filename).to.contain('app.log');
    done();
  });
});
describe('stream function', function streamSuite() {
  it('test stream', function testStreamFunctionality(done) {
    expect(stream).to.exist;
    expect(stream.write).is.function;
    sinon.spy(stream, 'write');
    stream.write('request');
    expect(stream.write.calledOnce).is.true;
    done();
  });
});
