'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var pingHandler = require('../../../handlers/pingHandler');

describe('ping handler', function desc() {
  it('exits', function it(done) {
    pingHandler.should.exits;
    done();
  });
  it('has a handle ping', function it(done) {
    pingHandler.handlePing.should.exist;
    done();
  });
  it('has a handle alive', function it(done) {
    pingHandler.handleAlive.should.exist;
    done();
  });
});
