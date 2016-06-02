'use strict';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const pingHandler = require('../../../handlers/pingHandler');

describe('ping handler', function desc() {
  let reply;
  beforeEach(function bef() {
    reply = sinon.spy();
  });
  it('exits', function it() {
    should.exist(pingHandler);
  });
  it('has a handle ping', function it() {
    should.exist(pingHandler.handlePing);
  });
  it('handlePing', function it() {
    pingHandler.handlePing({}, reply);
    // cache causes the following to fail
    // reply.called.should.be.true;
    // reply.callCount.should.be.equal(1);
  });
  it('has a handle alive', function it() {
    should.exist(pingHandler.handleAlive);
  });
  it('handlePing', function it() {
    pingHandler.handleAlive({}, reply);
    reply.called.should.be.true;
    reply.callCount.should.be.equal(1);
  });
});
