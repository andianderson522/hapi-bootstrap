'use strict';
const chai = require('chai');
const should = chai.should();
const shared = require('../../shared');

describe('shared.js', function desc() {
  it('exists', function it() {
    should.exist(shared);
  });
  it('has a Hapi server', function it() {
    should.exist(shared.server);
    shared.server.should.exist;
  });
});
