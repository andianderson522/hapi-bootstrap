'use strict';
const chai = require('chai');
const should = chai.should();
const routes = require('../../../routes');

describe('routes: ', function desc() {
  it('exists', function it() {
    should.exist(routes);
  });
});
