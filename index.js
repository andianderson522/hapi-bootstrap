'use strict';
require('newrelic');
var Hapi = require('hapi');
// var config = require('./config')();
// var log = require('./logger');
// var extensions = require('./extensions');
// var Inert = require('inert');
// var Vision = require('vision');

var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});
server.connection({ port: config.port });

/*
server.ext('onPreResponse', function ext(request, reply) {
  extensions.handlePreResponse(request, reply);
  return reply.continue();
});

server.on('request-internal', extensions.handleOnRequest);

server.on('request-err', extensions.handleOnRequestError);

server.on('tail', extensions.handleTail);
*/

require('./routes')(server);

// server.register([
  // Inert,
  // Vision,
  // require('./plugins/swaggerPlugin')
// ], function handlePluginRegistrationError(err) {
  // if (err) {
    // log.error(JSON.stringify(err));
    // throw err; // something bad happened loading the plugins
  // }
  server.start(function serverStartedCallback() {
    log.warn('running ' + config.mode + ' configuration');
    log.warn('Server running at: ' + server.info.uri);
  });
// });
