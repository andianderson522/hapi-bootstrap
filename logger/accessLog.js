'use strict';
var winston = require('winston');
var config = require('../config')();

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: config.logDir + '/app.log',
      handleExceptions: true,
      json: true,
      tailable: true
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
