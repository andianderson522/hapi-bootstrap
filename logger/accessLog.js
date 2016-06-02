'use strict';
const winston = require('winston');
const config = require('../config')();

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: config.level,
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
