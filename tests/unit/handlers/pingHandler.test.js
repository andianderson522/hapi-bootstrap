'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var sinon = require('sinon');
var pingHandler = require('../../../handlers/pingHandler');

describe('ping handler', function desc() {
  let reply;
  beforeEach(function bef() {
    reply = sinon.spy();
  });
  it('exits', function it(done) {
    pingHandler.should.exits;
    done();
  });
  it('has a handle ping', function it(done) {
    pingHandler.handlePing.should.exist;
    done();
  });
  it('handlePing', function it(done) {
    pingHandler.handlePing({}, reply);
    reply.called.should.be.true;
    reply.callCount.should.be.equal(1);
    done();
  });
  it('has a handle alive', function it(done) {
    pingHandler.handleAlive.should.exist;
    done();
  });
  it('handlePing', function it(done) {
    pingHandler.handleAlive({}, reply);
    reply.called.should.be.true;
    reply.callCount.should.be.equal(1);
    done();
  });
});
