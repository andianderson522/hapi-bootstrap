'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const logger = require('../../../logger/accessLog');
const stream = require('../../../logger/accessLog').stream;
const config = require('../../../config')();


describe('Access Logging setup', function describeAccessLoggingSuite() {
  after(function cleanupTtest() {
    logger.debug('complete');
  });
  it('test logger setup', function testLoggerConfiguration(done) {
    expect(logger).to.exist;
    var transports = logger.transports;
    expect(transports).to.exist;
    expect(transports.console).to.exist;
    expect(transports.console.level).to.equal(config.level);
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
