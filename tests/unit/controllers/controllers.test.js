'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var controllers = require('../../../controllers');

describe('controllers test', function desc() {
  it('exists', function it(done) {
    controllers.should.exist;
    done();
  });
});
