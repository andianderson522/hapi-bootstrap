'use strict';
var chai = require('chai');
var expect = chai.expect;

exports.basicSuperAgentRequestSuccess = function basicSuperAgentRequestSuccess(err, res, statusCode) {
  expect(err, 'should not have an err').to.not.exist;
  expect(res.status, 'should have the expected status').to.eql(statusCode || 200);
  expect(res.data).to.not.exist;
  expect(res.text, 'response should have text').to.exist;
  expect(res.body, 'should have a body').to.exist;
};

exports.assertHeadRequestSuccess = function assertHeadRequestSuccess(err, res) {
  expect(err, 'should not have an err object').to.not.exist;
  expect(res.status, 'should have a statusCode of 200').to.eql(200);
  expect(res.data).to.not.exist;
  expect(res.text).to.not.exist;
  expect(res.body, 'expect body to exist').to.exist;
};

exports.assertBadSuperAgentRequest = function assertBadSuperAgentRequest(err, res, statusCode) {
  expect(err, 'expect err to exist').to.exist;
  expect(res, 'expect res to exist').to.exist;
  expect(res.status, 'status should equal: ' + statusCode).to.equal(statusCode);
  var body = res.body;
  expect(body).to.not.be.empty;
  expect(body.statusCode).to.equal(statusCode);
  expect(body.error).to.not.be.empty;
};

exports.assert404SuperAgentRequest = function assert404SuperAgentRequest(err, res) {
  expect(err, 'should have an err object').to.exist;
  expect(res, 'should have a res object').to.exist;
  expect(res.status).to.equal(404);
};
