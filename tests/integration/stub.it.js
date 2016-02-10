'use strict';
var expect = require('chai').expect;
var config = require('./config')();
var log = require('./logger');

describe('test harness stub', function desc() {
  it('works', function it(done) {
    log.warn('running against: ' + config.mode);
    expect(config.mode).is.defined;
    done();
  });
});
