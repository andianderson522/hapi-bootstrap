'use strict';
const chai = require('chai');
const should = chai.should();
const utils = require('../../../utils');

describe('utils', function desc() {
  it('exists', function it() {
    should.exist(utils);
  });
  it('has a cacheUtils', function it() {
    should.exist(utils.cacheUtils);
  });
});
