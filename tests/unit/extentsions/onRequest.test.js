'use strict';
var chai = require('chai');
var expect = chai.expect;
var onRequest = require('../../../extensions/onRequest');

describe('onRequest: ', function desc() {
  it('exists', function it(done) {
    expect(onRequest).exists;
    done();
  });
  it('has a handleOnRequest function', function it(done) {
    expect(onRequest.handleOnRequest).is.a.function;
    done();
  });
});
