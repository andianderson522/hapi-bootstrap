'use strict';
const argv = require('minimist')(process.argv.slice(2));

const port = process.env.NODE_PORT || 8081;

const config = {
  local: {
    mode: 'local',
    level: 'debug',
    port: port,
    basePath: 'localhost:8081',
    schemes: ['http'],
    redis: {
      host: 'ci-redis-user-platform.conde.io',
      port: 6379,
      cachePartition: 'localYOURSERVICENAMECache'
    },
    cache: {
      expiresInMinutes: 4,
      staleInMinutes: 2,
      staleTimeoutMinutes: 1,
      generateTimeout: 400
    }
  },
  ci: {
    mode: 'ci',
    level: 'info',
    port: port,
    // FIXME change to actual
    basePath: '',
    schemes: ['http'],
    redis: {
      host: 'ci-redis-user-platform.conde.io',
      port: 6379,
      cachePartition: 'ciYOURSERVICENAMECache'
    },
    cache: {
      expiresInMinutes: 8,
      staleInMinutes: 4,
      staleTimeoutMinutes: 2,
      generateTimeout: 400
    }
  },
  staging: {
    mode: 'stag',
    level: 'warn',
    port: port,
    // FIXME change to actual
    basePath: '',
    schemes: ['https'],
    redis: {
      host: 'stag-redis-user-platform.conde.io',
      port: 6379,
      cachePartition: 'stagYOURSERVICENAMECache'
    },
    cache: {
      expiresInMinutes: 16,
      staleInMinutes: 8,
      staleTimeoutMinutes: 4,
      generateTimeout: 400
    }
  },
  production: {
    mode: 'prod',
    level: 'error',
    port: port,
    // FIXME change to actual
    basePath: '',
    schemes: ['https'],
    redis: {
      host: 'prod-redis-user-platform.conde.io',
      port: 6379,
      cachePartition: 'prodYOURSERVICENAMECache'
    },
    cache: {
      expiresInMinutes: 32,
      staleInMinutes: 16,
      staleTimeoutMinutes: 8,
      generateTimeout: 400
    }
  }
};

module.exports = function determineConfigMode(mode) {
  return config[mode || argv.env || process.env.NODE_ENV || 'ci'] || config.ci;
};
