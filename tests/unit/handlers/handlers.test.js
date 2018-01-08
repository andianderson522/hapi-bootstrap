'use strict';
const chai = require('chai');
const should = chai.should();
const handlers = require('../../../handlers');

describe('handlers', function desc() {
  it('exists', function it() {
    should.exist(handlers);
  });
  it('has a ping handler', function it() {
    should.exist(handlers.pingHandler);
  });
});
