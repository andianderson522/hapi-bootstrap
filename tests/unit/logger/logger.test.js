
'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const config = require('../../../config')();
const logger = require('../../../logger');
const stream = require('../../../logger').stream;

describe('Logging setup', function describeLoggingSuite() {
  it('test logger setup', function testLoggerConfiguration(done) {
    expect(logger).to.exist;
    var transports = logger.transports;
    expect(transports).to.exist;
    expect(transports.console).to.exist;
    expect(transports.console.level).to.equal(config.level);
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
