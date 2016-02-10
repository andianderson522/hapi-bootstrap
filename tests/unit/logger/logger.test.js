'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var config = require('../../../config')();
var logger = require('../../../logger');
var stream = require('../../../logger').stream;

describe('Logging setup', function describeLoggingSuite() {
  it('test logger setup', function testLoggerConfiguration(done) {
    expect(logger).to.exist;
    var transports = logger.transports;
    expect(transports).to.exist;
    var file = transports.file;
    expect(file).to.exist;
    expect(file.level).to.equal(config.level);
    expect(transports.console.level).to.equal(config.consoleLogLevel);
    expect(file.filename).to.contain('app.log');
    done();
  });
});
describe('stream function', function describeStreamSuite() {
  it('test stream', function testStreamFunctionality(done) {
    expect(stream).to.exist;
    expect(stream.write).is.function;
    sinon.spy(stream, 'write');
    stream.write('hello');
    expect(stream.write.calledOnce).is.true;
    done();
  });
});
