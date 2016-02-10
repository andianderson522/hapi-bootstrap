'use strict';
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('Configuration setup', function describeConfigurationSuite() {
  it('should load local configurations', function testLocalConfiguration(next) {
    let config = require('../../../config')('local');
    expect(config.mode).to.equal('local');
    expect(config.level).to.equal('debug');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('http://localhost:8081');
    next();
  });
  it('should load ci configurations', function testCiConfiguration(next) {
    let config = require('../../../config')('ci');
    expect(config.mode).to.equal('ci');
    expect(config.level).to.equal('debug');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('http://ci-cnid-user-service.conde.io');
    next();
  });
  it('should load staging configurations', function testStagingConfiguration(next) {
    let config = require('../../../config')('staging');
    expect(config.mode).to.equal('stag');
    expect(config.level).to.equal('info');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('https://stag-cnid-user-service.conde.io');
    next();
  });
  it('should load production configurations', function testProductionConfiguration(next) {
    let config = require('../../../config')('production');
    expect(config.mode).to.equal('prod');
    expect(config.level).to.equal('info');
    expect(config.port).to.equal(8081);
    assert.isDefined(config.logDir);
    expect(config.basePath).to.equal('https://prod-cnid-user-service.conde.io');
    next();
  });
});
