'use strict';
module.exports = function attachPingRoutes(server) {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: function handlePing(request, reply) {
      reply({'message': 'pong'});
    },
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring']
    }
  });
  server.route({
    method: 'GET',
    path: '/alive',
    handler: function handleAlive(request, reply) {
      reply({'message': 'I think therfore I am.'});
    },
    config: {
      description: 'A "Im Alive" endpoint for dev-ops',
      notes: 'this endpoint is used for telling if the app is still running',
      tags: ['api', 'monitoring']
    }
  });
};
