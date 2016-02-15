var chai = require('chai');
var expect = chai.expect;
var preResonseExtension = require('../../../extensions/preResponseExtension');

describe('preResponse: ', function desc() {
  it('exists', function it(done) {
    expect(preResonseExtension).to.exist;
    done();
  });
});
