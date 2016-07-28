'use strict';
const Hapi = require('hapi');
const config = require('./config')();

module.exports = {
  server: new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    },
    cache: [ {
      engine: require('catbox-redis'),
      host: config.redis.host,
      port: config.redis.port,
      partition: config.redis.cachePartition,
      shared: true
    }]
  })
};
