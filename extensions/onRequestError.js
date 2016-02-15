'use strict';
var log = require('../logger');
var requestSummerizer = require('./requestSummerizer');

function logError(request, error) {
  let summary = requestSummerizer.summarize(request);
  summary.error = {
    message: error.message,
    stack: error.stack
  };
  summary.type = 'error';
  log.error(summary);
}

exports.handleOnRequestError = function handleOnRequestError(request, err) {
  log.debug('handleOnRequestError');
  logError(request, err);
};
