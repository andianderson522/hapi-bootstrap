'use strict';
var chai = require('chai');
var expect = chai.expect;
var config = require('./config')();
var log = require('./logger');
var superagent = require('superagent');
var assertions = require('./helpers/assertions');

describe('Ping Routes work', function describePingRoutesSuite() {
  var basePath = config.baseURL;
  var headers = {
    'X-Client': 'integration'
  };
  it('/ping works', function testGETPingWorks(done) {
    superagent.get(basePath + '/ping')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        assertions.basicSuperAgentRequestSuccess(err, res);
        log.debug(res.body);
        expect(res.body.message).to.equal('pong');
        done();
      });
  });
  it('/ping post fails', function testPOSTPingFails(done) {
    superagent.post(basePath + '/ping')
      .send()
      .set(headers)
      .end(function handleResponse(err, res) {
        expect(err).to.exist;
        expect(res.status).to.eql(404);
        expect(res.data).to.not.exist;
        expect(res.text).to.exist;
        expect(res.body).to.exist;
        log.debug(res.body);
        expect(res.body.error).to.equal('Not Found');
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
        expect(res.body.message).to.equal('I think therfore I am.');
        done();
      });
  });
});
