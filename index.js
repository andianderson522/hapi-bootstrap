'use strict';
const config = require('./config')();
const log = require('./logger');
const extensions = require('./extensions');
const shared = require('./shared');
const serv = shared.server;
const Inert = require('inert');
const Vision = require('vision');

serv.connection({ port: config.port });

serv.ext('onPreResponse', extensions.handlePreResponse);

serv.on('request-internal', extensions.handleOnRequest);

serv.on('request-error', extensions.handleOnRequestError);

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
  serv.start(function serverStartedCallback(err) {
    if (err) {
      log.error(JSON.stringify(err));
      throw err; // something bad happened starting the server
    }
    log.warn('running ' + config.mode + ' configuration');
    log.warn('Server running at: ' + serv.info.uri);
  });
});
