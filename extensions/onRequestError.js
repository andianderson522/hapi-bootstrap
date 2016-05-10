'use strict';
var log = require('../logger');
var requestSummarizer = require('./requestSummarizer');
var newrelic = require('newrelic');

function logError(request, error) {
  let summary = requestSummarizer.summarize(request);
  summary.error = {
    message: error.message,
    stack: error.stack
  };
  summary.type = 'error';
  log.error(summary);
}

function putKeyValuesInContext(context, object) {
  return new Promise(function res(resolve) {
    if (object) {
      Object.keys(object).forEach((key) => {
        context.key = object[key];
      });
    }
    return resolve();
  });
}

function reportToNewRelic(request, error) {
  log.debug('sending error data to new relic');
  let context = {};
  return Promise.all([context, putKeyValuesInContext(context, request.headers), putKeyValuesInContext(context, request.params)], putKeyValuesInContext(context, request.query), putKeyValuesInContext(context, request.payload))
  .then(function sendToNewRelic(result) {
    newrelic.noticeError(error, result[0]);
    return Promise.resolve();
  });
}

exports.handleOnRequestError = function handleOnRequestError(request, err) {
  log.debug('handleOnRequestError');
  logError(request, err);
  reportToNewRelic(request, err);
};
