'use strict';
const chai = require('chai');
const expect = chai.expect;
const logger = require('../../../logger');

describe('Logging setup', function describeLoggingSuite() {
  it('test logger setup', function testLoggerConfiguration(done) {
    expect(logger).to.exist;
    done();
  });
});
