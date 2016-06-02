'use strict';
const chai = require('chai');
const should = chai.should();
const onTail = require('../../../extensions/onTail');

describe('onTail', function desc() {
  it('exists', function it() {
    should.exist(onTail);
  });
  it('has an handleTail function', function it() {
    should.exist(onTail.handleTail);
  });
});
