'use strict';
const chai = require('chai');
const should = chai.should();
const requestSummarizer = require('../../../extensions/requestSummarizer');

describe('requestSummarizer: ', function desc() {
  it('exists', function it() {
    should.exist(requestSummarizer);
  });
  it('has a summerize function', function it() {
    should.exist(requestSummarizer.summarize);
  });
});
