'use strict';
var chai = require('chai');
var expect = chai.expect;
var onRequestError = require('../../../extensions/onRequestError');

describe('onRequestError', function desc() {
  it('exists', function it(done) {
    expect(onRequestError).exists;
    done();
  });
  it('has a handleOnRequestError function', function it(done) {
    expect(onRequestError.handleOnRequestError).is.a.function;
    done();
  });
});
