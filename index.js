'use strict';
require('newrelic');
var config = require('./config')();
var log = require('./logger');
var extensions = require('./extensions');
var shared = require('./shared');
var serv = shared.server;

var Inert = require('inert');
var Vision = require('vision');

serv.connection({ port: config.port });

// server.ext('onPreResponse', extensions.handlePreResponse);

serv.on('request-internal', extensions.handleOnRequest);

serv.on('request-error', extensions.handleOnRequestError);

serv.on('tail', extensions.handleTail);

require('./routes')(serv);

serv.register([
  Inert,
  Vision,
  require('./plugins/swaggerPlugin'),
  require('./plugins/hapiAndHealthyPlugin')
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
