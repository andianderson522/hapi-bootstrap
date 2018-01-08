'use strict';
const argv = require('minimist')(process.argv.slice(2));

const config = {
  local: {
    mode: 'local',
    level: 'info',
    baseURL: 'http://localhost:8081'
  },
  ci: {
    mode: 'ci',
    level: 'info',
    baseURL: 'http://'
  },
  staging: {
    mode: 'stag',
    level: 'info'
  },
  production: {
    mode: 'prod',
    level: 'warn'
  }
};
module.exports = function determineConfigMode(mode) {
  return config[mode || argv.env || process.env.NODE_ENV || 'ci'];
};
