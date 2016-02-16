'use strict';
var chai = require('chai');
var expect = chai.expect;
var requestSummarizer = require('../../../extensions/requestSummarizer');

describe('requestSummarizer: ', function desc() {
  it('exists', function it(done) {
    expect(requestSummarizer).exits;
    done();
  });
  it('has a summerize function', function it(done) {
    expect(requestSummarizer.summerize).is.a.function;
    done();
  });
});
