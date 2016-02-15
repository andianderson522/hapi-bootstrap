'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var handlers = require('../../../handlers');

describe('handlers', function desc() {
  it('exists', function it(done) {
    handlers.should.exits;
    done();
  });
  it('has a ping handler', function it(done) {
    handlers.pingHandler.should.exist;
    done();
  });
});
