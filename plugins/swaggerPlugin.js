'use strict';
const pack = require('../package.json');
const config = require('../config')();

const swaggerOptions = {
  host: config.basePath,
  schemes: config.schemes,
  pathPrefixSize: 2,
  payloadType: 'json',
  info: {
    title: 'PUT YOUR API Documentation NAME HERE',
    version: pack.version + ' ' + config.mode
  }
};

module.exports = {
  register: require('hapi-swagger'),
  options: swaggerOptions
};
