'use strict';
const config = require('../config')();
const health = require('../services').healthService;

const healthCheckOptions = {
  env: config.env,
  name: 'YOURAPPNAMEHERE',
  path: '/health',
  usage: false,
  defaultContentType: 'application/json',
  test: {
    node: [
      health.checkStubHealth
    ]
    /*
    features: [
      function featureCheck(cb) {
        return cb(false, '[PASSED] Feature checks');
      }
    ]
    */
  }
};

module.exports = {
  register: require('hapi-and-healthy'),
  options: healthCheckOptions
};
