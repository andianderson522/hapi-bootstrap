'use strict';
var chai = require('chai');
var expect = chai.expect;
var requestSummerizer = require('../../../extensions/requestSummerizer');

describe('requestSummerizer: ', function desc() {
  it('exists', function it(done) {
    expect(requestSummerizer).exits;
    done();
  });
  it('has a summerize function', function it(done) {
    expect(requestSummerizer.summerize).is.a.function;
    done();
  });
});
