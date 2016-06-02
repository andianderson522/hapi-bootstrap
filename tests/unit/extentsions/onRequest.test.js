'use strict';
const chai = require('chai');
const should = chai.should();
const onRequest = require('../../../extensions/onRequest');

describe('onRequest: ', function desc() {
  it('exists', function it() {
    should.exist(onRequest);
  });
  it('has a handleOnRequest function', function it() {
    should.exist(onRequest.handleOnRequest);
  });
});
