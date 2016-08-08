'use strict';
var winston = require('winston');
var config = require('../config')();

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.level,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function writeToStream(message) {
    logger.info(message);
  }
};
