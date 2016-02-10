'use strict';
var pack = require('../package.json');
var config = require('../config')();

var swaggerOptions = {
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
