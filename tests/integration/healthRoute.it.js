'use strict';
const chai = require('chai');
const should = chai.should();
var config = require('./config')();
var log = require('./logger');
var superagent = require('superagent');
var assertions = require('./helpers/assertions');

describe('health Routes work', function describePingRoutesSuite() {
  const basePath = config.baseURL;
  const headers = {
    'X-Client': 'integration'
  };
  it('/health works', function it(done) {
    superagent.get(basePath + '/health')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        assertions.basicSuperAgentRequestSuccess(err, res);
        log.debug(res.body);
        should.exist(res.body);
        const service = res.body.service;
        should.exist(service);
        const status = service.status;
        should.exist(status);
        should.exist(status.state);
        // FIXME this is where you test your checks
        should.exist(status.message);
        should.exist(status.published);
        done();
      });
  });
});
