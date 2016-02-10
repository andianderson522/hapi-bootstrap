'use strict';
var argv = require('minimist')(process.argv.slice(2));

var config = {
  local: {
    mode: 'local',
    level: 'info',
    baseURL: 'http://localhost:8081'
  },
  ci: {
    mode: 'ci',
    level: 'info',
    baseURL: 'http://ci-cnid-user-service.conde.io'
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
