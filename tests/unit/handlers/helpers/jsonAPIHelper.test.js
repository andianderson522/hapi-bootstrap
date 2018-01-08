'use strict';
const chai = require('chai');
const should = chai.should();
const tools = require('@condenast/user-platform-utils');
const helpers = tools.helpers;
const jsonAPIHelper = helpers.jsonAPIHelper;

describe('jsonAPIHelper', function desc() {
  it('exists', function it() {
    should.exist(jsonAPIHelper);
  });
  describe('validateAcceptHeader', function descValidateAcceptHeader() {
    it('exists', function it() {
      should.exist(jsonAPIHelper.validateAcceptHeader);
    });
    it('sends 406 on no accept', function it(done) {
      const request = {
        headers: {

        }
      };
      try {
        jsonAPIHelper.validateAcceptHeader(request);
      } catch (err) {
        should.exist(err);
        err.message.should.equal('Not Acceptable');
        err.output.statusCode.should.equal(406);
      }
      done();
    });
    it('sends 415 on wrong accept', function it(done) {
      const request = {
        headers: {
          accept: 'application/json'
        }
      };
      try {
        jsonAPIHelper.validateAcceptHeader(request);
      } catch (err) {
        should.exist(err);
        err.message.should.equal('only "application/vnd.api+json" supported');
        err.output.statusCode.should.equal(415);
      }
      done();
    });
    it('good path', function it(done) {
      const request = {
        headers: {
          accept: 'application/vnd.api+json'
        }
      };
      try {
        jsonAPIHelper.validateAcceptHeader(request);
      } catch (err) {
        should.not.exist(err);
      }
      done();
    });
  });
});
