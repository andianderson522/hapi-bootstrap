'use strict';
const chai = require('chai');
const should = chai.should();
const healthService = require('../../../services/healthService');

describe('healthService', function desc() {
  it('exists', function it() {
    should.exist(healthService);
  });
  describe('checkStubHealth', function desccheckStubHealth() {
    it('exists', function it() {
      should.exist(healthService.checkStubHealth);
    });
    it('works', function it(done) {
      healthService.checkStubHealth(function cb(err, result) {
        should.not.exist(err);
        should.exist(result);
        result.should.equal('[PASSED]; Stubbed health check');
        done();
      });
    });
  });
});
