'use strict';
require('newrelic');
// var Hapi = require('hapi');
var config = require('./config')();
var log = require('./logger');
var extensions = require('./extensions');
var shared = require('./shared');
var serv = shared.server;

var Inert = require('inert');
var Vision = require('vision');

/*
const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  },
  cache: [ {
    engine: require('catbox-redis'),
    host: config.redisHost,
    port: config.resisPort,
    partition: config.cachePartion,
    shared: true
  }]
});
*/
serv.connection({ port: config.port });

// server.ext('onPreResponse', extensions.handlePreResponse);

serv.on('request-internal', extensions.handleOnRequest);

serv.on('request-err', extensions.handleOnRequestError);

serv.on('tail', extensions.handleTail);

require('./routes')(serv);

serv.register([
  Inert,
  Vision,
  require('./plugins/swaggerPlugin'),
  require('./plugins/goodPlugin')
], function handlePluginRegistrationError(err) {
  if (err) {
    log.error(JSON.stringify(err));
    throw err; // something bad happened loading the plugins
  }
  serv.start(function serverStartedCallback() {
    log.warn('running ' + config.mode + ' configuration');
    log.warn('Server running at: ' + serv.info.uri);
  });
});
