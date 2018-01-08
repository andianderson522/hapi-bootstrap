'use strict';
const config = require('../config')();
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'bunyan', color: false, levelInString: true});

const logger = bunyan.createLogger({
  name: 'hapi-bootstrap',
  stream: formatOut,
  level: config.logLevel
});

module.exports = logger;

module.exports.stream = {
  write: function writeToStream(message) {
    logger.info(message);
  }
};
