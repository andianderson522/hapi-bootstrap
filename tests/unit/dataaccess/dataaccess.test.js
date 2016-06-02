'use strict';
const chai = require('chai');
const should = chai.should();
const dataaccess = require('../../../dataaccess');

describe('dataaccess', function desc() {
  it('exists', function it() {
    should.exist(dataaccess);
  });
});
