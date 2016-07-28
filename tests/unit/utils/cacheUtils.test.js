'use strict';
const chai = require('chai');
const should = chai.should();
const utils = require('../../../utils');
const cacheUtils = utils.cacheUtils;

describe('cacheUtils', function desc() {
  it('exists', function it() {
    should.exist(cacheUtils);
  });
  describe('generateCacheForEnv', function descGenerateCacheForEnv() {
    it('exists', function it() {
      should.exist(cacheUtils.generateCacheForEnv);
    });
    it('can generate the cache Region for the env', function it() {
      const expectedRegion = 'test';
      const result = cacheUtils.generateCacheForEnv(expectedRegion);
      should.exist(result);
      result.expiresIn.should.gte(480000);
      result.staleIn.should.gte(240000);
      result.staleTimeout.should.gte(120000);
      result.generateTimeout.should.equal(400);
      result.segment.should.equal('test');
    });
  });
});
