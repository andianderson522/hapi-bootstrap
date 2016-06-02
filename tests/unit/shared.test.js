'use strict';
const chai = require('chai');
const should = chai.should();
const shared = require('../../shared');

describe('shared.js', function desc() {
  it('exists', function it() {
    should.exist(shared);
  });
  it('has a Hapi server', function it() {
    should.exist(shared.server);
    shared.server.should.exist;
  });
  it('has a second constant', function it() {
    shared.SECOND.should.equal(1000);
  });
  it('has a minute constant', function it() {
    shared.MINUTE.should.equal(60 * shared.SECOND);
  });
  it('has an hour constant', function it() {
    shared.HOUR.should.equal(60 * shared.MINUTE);
  });
  it('has a DAY constant', function it() {
    shared.DAY.should.equal(24 * shared.HOUR);
  });
  it('has a WEEK constant', function it() {
    shared.WEEK.should.equal(7 * shared.DAY);
  });
  it('has a MONTH constant', function it() {
    shared.MONTH.should.equal(4 * shared.WEEK);
  });
});
