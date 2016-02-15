'use strict';
var config = require('../config')();

var goodOptions = {
  opsInterval: 1000,
  reporters: [{
    reporter: require('good-file'),
    events: {
      log: '*',
      response: '*'
    },
    config: {
      path: config.logDir,
      rotate: 'daily'
    }
  }, {
    reporter: require('good-console'),
    events: {
      log: '*',
      response: '*'
    }
  }]
};

module.exports = {
  register: require('good'),
  options: goodOptions
};
