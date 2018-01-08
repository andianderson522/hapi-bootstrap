'use strict';
const chai = require('chai');
const should = chai.should();

describe('Configuration setup', function describeConfigurationSuite() {
  it('should load local configurations', function testLocalConfiguration(done) {
    const config = require('../../../config')('local');
    config.mode.should.equal('local');
    config.level.should.equal('debug');
    config.port.should.equal(8081);
    config.basePath.should.equal('localhost:8081');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('localhost');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('localYOURSERVICENAMECache');
    const cache = config.cache;
    should.exist(cache);
    cache.expiresInMinutes.should.equal(4);
    cache.staleInMinutes.should.equal(2);
    cache.staleTimeoutMinutes.should.equal(1);
    cache.generateTimeout.should.equal(400);
    done();
  });
  it('should load ci configurations', function testCiConfiguration(done) {
    const config = require('../../../config')('ci');
    config.mode.should.equal('ci');
    config.level.should.equal('info');
    config.port.should.equal(8081);
    config.basePath.should.equal('');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('YOUR_CI_REDIS_HOST');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('ciYOURSERVICENAMECache');
    const cache = config.cache;
    should.exist(cache);
    cache.expiresInMinutes.should.equal(8);
    cache.staleInMinutes.should.equal(4);
    cache.staleTimeoutMinutes.should.equal(2);
    cache.generateTimeout.should.equal(400);
    done();
  });
  it('should load staging configurations', function testStagingConfiguration(done) {
    const config = require('../../../config')('staging');
    config.mode.should.equal('stag');
    config.level.should.equal('warn');
    config.port.should.equal(8081);
    config.basePath.should.equal('');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('YOUR_STAG_REDIS_HOST');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('stagYOURSERVICENAMECache');
    const cache = config.cache;
    should.exist(cache);
    cache.expiresInMinutes.should.equal(16);
    cache.staleInMinutes.should.equal(8);
    cache.staleTimeoutMinutes.should.equal(4);
    cache.generateTimeout.should.equal(400);
    done();
  });
  it('should load production configurations', function testProductionConfiguration(done) {
    const config = require('../../../config')('production');
    config.mode.should.equal('prod');
    config.level.should.equal('error');
    config.port.should.equal(8081);
    config.basePath.should.equal('');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('YOUR_PROD_REDIS_HOST');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('prodYOURSERVICENAMECache');
    const cache = config.cache;
    should.exist(cache);
    cache.expiresInMinutes.should.equal(32);
    cache.staleInMinutes.should.equal(16);
    cache.staleTimeoutMinutes.should.equal(8);
    cache.generateTimeout.should.equal(400);
    done();
  });
});
