'use strict';
var chai = require('chai');
/*eslint-disable*/
var should = chai.should();
/*eslint-enable*/
var shared = require('../../shared');

describe('shared.js', function desc() {
  it('exists', function it(done) {
    shared.should.exist;
    done();
  });
  it('has a Hapi server', function it(done) {
    shared.server.should.exist;
    done();
  });
  it('has a second constant', function it(done) {
    shared.SECOND.should.equal(1000);
    done();
  });
  it('has a minute constant', function it(done) {
    shared.MINUTE.should.equal(60 * shared.SECOND);
    done();
  });
  it('has an hour constant', function it(done) {
    shared.HOUR.should.equal(60 * shared.MINUTE);
    done();
  });
  it('has a DAY constant', function it(done) {
    shared.DAY.should.equal(24 * shared.HOUR);
    done();
  });
  it('has a WEEK constant', function it(done) {
    shared.WEEK.should.equal(7 * shared.DAY);
    done();
  });
  it('has a MONTH constant', function it(done) {
    shared.MONTH.should.equal(4 * shared.WEEK);
    done();
  });
});
