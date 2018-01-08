'use strict';
const chai = require('chai');
const should = chai.should();
const onRequestError = require('../../../extensions/onRequestError');

describe('onRequestError', function desc() {
  it('exists', function it() {
    should.exist(onRequestError);
  });
  it('has a handleOnRequestError function', function it() {
    should.exist(onRequestError.handleOnRequestError);
  });
});
