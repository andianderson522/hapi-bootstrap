'use strict';
const chai = require('chai');
const should = chai.should();
const services = require('../../../services');

describe('services test', function desc() {
  it('exists', function it() {
    should.exist(services);
  });
  it('has a healthService', function it() {
    should.exist(services.healthService);
  });
});
