'use strict';
const handlers = require('../handlers');
const pingHandler = handlers.pingHandler;

module.exports = function attachPingRoutes(server) {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: pingHandler.handlePing,
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 300 * 1000
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/alive',
    handler: pingHandler.handleAlive,
    config: {
      description: 'A "Im Alive" endpoint for dev-ops',
      notes: 'this endpoint is used for telling if the app is still running',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 300 * 1000
      }
    }
  });
};
