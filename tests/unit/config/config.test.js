'use strict';
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Configuration setup', function describeConfigurationSuite() {
  it('should load local configurations', function testLocalConfiguration(next) {
    let config = require('../../../config')('local');
    expect(config.mode).to.equal('local');
    expect(config.level).to.equal('fatal');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('localhost:8081');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('ci-redis-user-platform.conde.io');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('localYOURSERVICENAMECache');
    next();
  });
  it('should load ci configurations', function testCiConfiguration(next) {
    let config = require('../../../config')('ci');
    expect(config.mode).to.equal('ci');
    expect(config.level).to.equal('info');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('ci-cnid-user-service.conde.io');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('ci-redis-user-platform.conde.io');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('ciYOURSERVICENAMECache');
    next();
  });
  it('should load staging configurations', function testStagingConfiguration(next) {
    let config = require('../../../config')('staging');
    expect(config.mode).to.equal('stag');
    expect(config.level).to.equal('warn');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('stag-cnid-user-service.conde.io');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('stag-redis-user-platform.conde.io');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('stagYOURSERVICENAMECache');
    next();
  });
  it('should load production configurations', function testProductionConfiguration(next) {
    let config = require('../../../config')('production');
    expect(config.mode).to.equal('prod');
    expect(config.level).to.equal('error');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('prod-cnid-user-service.conde.io');
    const redis = config.redis;
    should.exist(redis);
    redis.host.should.equal('prod-redis-user-platform.conde.io');
    redis.port.should.equal(6379);
    redis.cachePartition.should.equal('prodYOURSERVICENAMECache');
    next();
  });
});
