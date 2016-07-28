'use strict';
const chai = require('chai');
const should = chai.should();
const utils = require('../../../utils');
const uuidUtils = utils.uuidUtils;

describe('uuidUtils', function desc() {
  it('exists', function it() {
    should.exist(uuidUtils);
  });
  it('isAUUID', function it() {
    uuidUtils.isAUUID('abc').should.be.false;
    uuidUtils.isAUUID(undefined).should.be.false;
    uuidUtils.isAUUID(null).should.be.false;
    uuidUtils.isAUUID('e2c71590-17e7-4df5-b0fa-e9f6d15cdf34').should.be.true;
  });
  it('generateUUID', function it() {
    const result = uuidUtils.generateUUID();
    should.exist(result);
    uuidUtils.isAUUID(result).should.be.true;
  });
});
