'use strict';
var winston = require('winston');
var config = require('../config')();
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: config.level,
      filename: config.logDir + '/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 10485760, // 5MB
      maxFiles: 7,
      colorize: false,
      timestamp: true,
      tailable: true,
      zippedArchive: true
    }),
    new winston.transports.Console({
      level: config.consoleLogLevel,
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
