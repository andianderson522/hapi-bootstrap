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
    'X-Client': 'integration',
    Accept: 'application/vnd.api+json'
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
  it('/ping fails with no accept', function it(done) {
    superagent.get(basePath + '/ping')
      .send()
      .set({'X-Client': 'integration'})
      .end(function handleResponse(err, res) {
        assertions.assertBadSuperAgentRequest(err, res, 406);
        should.exist(res.body);
        const errors = res.body.errors;
        should.exist(errors);
        const error = errors[0];
        should.exist(error);
        error.title.should.equal('Not Acceptable');
        error.status.should.equal(406);
        done();
      });
  });
  it('/ping fails with wrong accept', function it(done) {
    superagent.get(basePath + '/ping')
      .send()
      .set({'X-Client': 'integration', Accept: 'text/html'})
      .end(function handleResponse(err, res) {
        assertions.assertBadSuperAgentRequest(err, res, 415);
        should.exist(res.body);
        const errors = res.body.errors;
        should.exist(errors);
        const error = errors[0];
        should.exist(error);
        error.title.should.equal('Unsupported Media Type');
        error.status.should.equal(415);
        error.detail.should.equal('only "application/vnd.api+json" supported');
        done();
      });
  });
  it('/ping post fails', function testPOSTPingFails(done) {
    superagent.post(basePath + '/ping')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        assertions.assert404SuperAgentRequest(err, res);
        should.exist(err);
        should.exist(res.body);
        const errors = res.body.errors;
        should.exist(errors);
        const error = errors[0];
        should.exist(error);
        error.title.should.equal('Not Found');
        error.status.should.equal(404);
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
