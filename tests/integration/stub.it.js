'use strict';
var expect = require('chai').expect;
var config = require('./config')();

describe('test harness stub', function desc() {
  it('works', function it(done) {
    // FIXME make use a logger once its wired
    console.log('running against: ' + config.mode);
    expect(config.mode).is.defined;
    done();
  });
});
