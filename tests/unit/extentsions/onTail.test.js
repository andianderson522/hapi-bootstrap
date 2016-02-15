'use strict';
var chai = require('chai');
var expect = chai.expect;
var onTail = require('../../../extensions/onTail');

describe('onTail', function desc() {
  it('exists', function it(done) {
    expect(onTail).exists;
    done();
  });
  it('has an handleTail function', function it(done) {
    expect(onTail.handleTail).is.a.function;
    done();
  });
});
