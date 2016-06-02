'use strict';
const Hapi = require('hapi');
const config = require('./config')();

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
      host: config.redis.host,
      port: config.redis.port,
      partition: config.redis.cachePartition,
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
