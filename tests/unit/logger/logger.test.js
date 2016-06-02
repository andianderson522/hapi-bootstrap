'use strict';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const config = require('../../../config')();
const logger = require('../../../logger');
const stream = require('../../../logger').stream;

describe('Logging setup', function describeLoggingSuite() {
  it('test logger setup', function testLoggerConfiguration() {
    should.exist(logger);
    const transports = logger.transports;
    should.exist(transports);
    const file = transports.file;
    should.exist(file);
    file.level.should.equal(config.level);
    transports.console.level.should.equal(config.consoleLogLevel);
    file.filename.should.contain('app.log');
  });
});
describe('stream function', function describeStreamSuite() {
  it('test stream', function testStreamFunctionality() {
    should.exist(stream);
    should.exist(stream.write);
    sinon.spy(stream, 'write');
    stream.write('hello');
    stream.write.calledOnce.should.be.true;
  });
});
