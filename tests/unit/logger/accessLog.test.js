'use strict';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const logger = require('../../../logger/accessLog');
const stream = require('../../../logger/accessLog').stream;

describe('Access Logging setup', function describeAccessLoggingSuite() {
  after(function cleanupTtest() {
    logger.debug('complete');
  });
  it('test logger setup', function testLoggerConfiguration() {
    should.exist(logger);
    const transports = logger.transports;
    should.exist(transports);
    const file = transports.file;
    should.exist(file);
    file.level.should.equal('info');
    file.filename.should.contain('app.log');
  });
});
describe('stream function', function streamSuite() {
  it('test stream', function testStreamFunctionality() {
    should.exist(stream);
    should.exist(stream.write);
    sinon.spy(stream, 'write');
    stream.write('request');
    stream.write.calledOnce.should.be.true;
  });
});
