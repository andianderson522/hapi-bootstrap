'use strict';
const chai = require('chai');
const should = chai.should();

exports.basicSuperAgentRequestSuccess = function basicSuperAgentRequestSuccess(err, res, statusCode) {
  should.not.exist(err, 'should not have an err');
  res.status.should.equal(statusCode || 200);
  should.not.exist(res.data);
  should.exist(res.text);
  should.exist(res.body, 'should have a body');
};

exports.assertHeadRequestSuccess = function assertHeadRequestSuccess(err, res) {
  should.not.exist(err, 'should not have an err object');
  res.status.should.equal(200);
  should.not.exist(res.data);
  should.not.exist(res.text);
  should.exist(res.body, 'expect body to exist');
};

exports.assertBadSuperAgentRequest = function assertBadSuperAgentRequest(err, res, statusCode) {
  should.exist(err, 'expect err to exist');
  should.exist(res, 'expect res to exist');
  res.status.should.equal(statusCode);
  const body = res.body;
  should.exist(body);
  should.exist(body.errors);
};

exports.assert404SuperAgentRequest = function assert404SuperAgentRequest(err, res) {
  should.exist(err, 'should have an err object');
  should.exist(res, 'should have a res object');
  res.status.should.equal(404);
};
