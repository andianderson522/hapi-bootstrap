'use strict';
var Hapi = require('hapi');
var config = require('./config')();

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

module.exports = {
  server: new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    },
    cache: [ {
      engine: require('catbox-redis'),
      host: config.redisHost,
      port: config.redisPort,
      partition: config.cachePartion,
      shared: true
    }]
  }),
  MONTH: 2629746000,
  SECOND: SECOND,
  MINUTE: MINUTE,
  HOUR: HOUR,
  DAY: DAY
};
