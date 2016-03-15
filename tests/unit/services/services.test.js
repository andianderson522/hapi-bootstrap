'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var services = require('../../../services');

describe('services test', function desc() {
  it('exists', function it(done) {
    services.should.exist;
    done();
  });
});
