'use strict';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const Hapi = require('hapi');

describe('pingRoute test', function describePingRouteSuite() {
  it('is setup correctly', function testPingRouteSetupCorrectly() {
    should.exist(Hapi);
    const server = new Hapi.Server();
    server.connection({ port: 9999 });
    sinon.spy(server, 'route');
    require('../../../routes/pingRoute')(server);
    server.route.callCount.should.be.equal(2);
  });
});
