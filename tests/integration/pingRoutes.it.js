'use strict';
const chai = require('chai');
const should = chai.should();
const config = require('./config')();
const log = require('./logger');
const superagent = require('superagent');
const assertions = require('./helpers/assertions');

describe('Ping Routes work', function describePingRoutesSuite() {
  const basePath = config.baseURL;
  const headers = {
    'X-Client': 'integration'
  };
  it('/ping works', function testGETPingWorks(done) {
    superagent.get(basePath + '/ping')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        assertions.basicSuperAgentRequestSuccess(err, res);
        log.debug(res.body);
        res.body.message.should.equal('pong');
        done();
      });
  });
  it('/ping post fails', function testPOSTPingFails(done) {
    superagent.post(basePath + '/ping')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        should.exist(err);
        res.status.should.equal(404);
        should.not.exist(res.data);
        should.exist(res.body);
        res.body.error.should.equal('Not Found');
        done();
      });
  });
  it('/alive works', function testGETAliveWorks(done) {
    superagent.get(basePath + '/alive')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        assertions.basicSuperAgentRequestSuccess(err, res);
        log.debug(res.body);
        res.body.message.should.equal('I think therfore I am.');
        done();
      });
  });
});
