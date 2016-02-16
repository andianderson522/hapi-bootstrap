'use strict';
var Hapi = require('hapi');
var config = require('./config')();

// warning these do not take account leaps
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;

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
  MONTH: MONTH,
  SECOND: SECOND,
  MINUTE: MINUTE,
  HOUR: HOUR,
  DAY: DAY,
  WEEK: WEEK
};
