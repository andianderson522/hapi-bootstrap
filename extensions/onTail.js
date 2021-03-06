'use strict';
var log = require('../logger');
var requestSummarizer = require('./requestSummarizer');

function shouldLog(request) {
  if (request.route.path.indexOf('ping') > -1) {
    return false;
  }
  if (request.route.path.indexOf('alive') > -1) {
    return false;
  }
  return true;
}

function logResponse(request) {
  // Mute request to /ping
  if (shouldLog(request)) {
    let summary = requestSummarizer.summarize(request);
    summary.statusCode = request.raw.res.statusCode;
    summary.type = 'response';
    log.info(summary);
  }
}

exports.handleTail = function handleTail(request) {
  logResponse(request);
};
