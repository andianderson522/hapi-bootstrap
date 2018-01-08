'use strict';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const pingHandler = require('../../../handlers/pingHandler');

describe('ping handler', function desc() {
  let reply;
  const request = {
    headers: {
      accept: 'application/vnd.api+json'
    }
  };
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
    pingHandler.handlePing(request, reply);
  });
  it('has a handle alive', function it() {
    should.exist(pingHandler.handleAlive);
  });
  it('handlePing', function it() {
    pingHandler.handleAlive(request, reply);
    reply.called.should.be.true;
    reply.callCount.should.be.equal(1);
  });
});
