'use strict';
var Hapi = require('hapi');
var config = require('./config')();

module.exports.server = new Hapi.Server({
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
