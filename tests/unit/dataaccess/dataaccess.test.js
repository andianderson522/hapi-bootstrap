'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var dataaccess = require('../../../dataaccess');

describe('dataaccess', function desc() {
  it('exists', function it(done) {
    dataaccess.should.exist;
    done();
  });
});
