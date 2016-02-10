'use strict';
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

var port = process.env.NODE_PORT || 8081;

function logDirExistsSync() {
  // FIXME needs to be changed to actual
  var expectedLogDir = '/cn/runtime/cnid-user-service/nodejs/logs';
  try {
    if (fs.statSync(expectedLogDir).isDirectory()) {
      return expectedLogDir;
    }
  } catch (err) {
    /*eslint-disable*/
    console.error('log directory does not exist falling back to internal dir');
    /*eslint-enable*/
    return './logs';
  }
}

var config = {
  local: {
    mode: 'local',
    level: 'debug',
    consoleLogLevel: 'debug',
    port: port,
    logDir: './logs',
    basePath: 'localhost:8081',
    schemes: ['http']
  },
  ci: {
    mode: 'ci',
    level: 'debug',
    consoleLogLevel: 'debug',
    port: port,
    logDir: logDirExistsSync(),
    // FIXME change to actual
    basePath: 'ci-cnid-user-service.conde.io',
    schemes: ['http']
  },
  staging: {
    mode: 'stag',
    level: 'info',
    consoleLogLevel: 'error',
    port: port,
    logDir: logDirExistsSync(),
    // FIXME change to actual
    basePath: 'stag-cnid-user-service.conde.io',
    schemes: ['https']
  },
  production: {
    mode: 'prod',
    level: 'info',
    consoleLogLevel: 'error',
    port: port,
    logDir: logDirExistsSync(),
    // FIXME change to actual
    basePath: 'prod-cnid-user-service.conde.io',
    schemes: ['https']
  }
};

module.exports = function determineConfigMode(mode) {
  return config[mode || argv.env || process.env.NODE_ENV || 'ci'] || config.ci;
};
