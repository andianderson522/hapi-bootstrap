'use strict';
const chai = require('chai');
const should = chai.should();
const preResonseExtension = require('../../../extensions/preResponseExtension');

describe('preResponse: ', function desc() {
  it('exists', function it() {
    should.exist(preResonseExtension);
  });
});
