'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var routes = require('../../../routes');

describe('routes: ', function desc() {
  it('exists', function it(done) {
    routes.should.exist;
    done();
  });
});
