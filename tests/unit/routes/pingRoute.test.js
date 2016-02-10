'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Hapi = require('hapi');

describe('pingRoute test', function describePingRouteSuite() {
  it('is setup correctly', function testPingRouteSetupCorrectly(done) {
    var server = new Hapi.Server();
    server.connection({ 'port': 9999 });
    sinon.spy(server, 'route');
    require('../../../routes/pingRoute')(server);
    expect(server.route.callCount).is.equal(2);
    done();
  });
});
