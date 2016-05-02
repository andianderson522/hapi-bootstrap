'use strict';
var chai = require('chai');
var should = chai.should();
var services = require('../../../services');

describe('services test', function desc() {
  it('exists', function it() {
    should.exist(services);
  });
  it('has a healthService', function it() {
    should.exist(services.healthService);
  });
});
