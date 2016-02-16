'use strict';
var newrelic = require('newrelic');
var log = require('../logger');
var requestSummarizer = require('./requestSummarizer');

function doNewRelic(request, xClient) {
  log.debug('sending data to new relic');
  newrelic.addCustomParameter('x-client', xClient);
  let xForwardedFor = request.headers['x-forwarded-for'] || 'unknown';
  newrelic.addCustomParameter('x-forwarded-for', xForwardedFor);
}

function shouldLog(request) {
  if (request.route.path.indexOf('ping') > -1) {
    return false;
  }
  if (request.route.path.indexOf('alive') > -1) {
    return false;
  }
  return true;
}

function logRequest(request, event, tags) {
  // Mute request to /ping
  if (shouldLog(request)) {
    let summary = requestSummarizer.summarize(request);
    summary.type = 'request';
    if (tags.payload) {
      summary.payload = event.data;
    } else if (tags.handler) {
      summary.handlerExecutionTime = event.data.msec;
    } else {
      return;
    }
    log.debug(summary);
  }
}

exports.handleOnRequest = function handleOnRequest(request, event, tags) {
  log.debug('handeling onRequest: ' + request.method + ' ' + request.path);
  let xClient = request.headers['x-client'] || 'unknown';
  doNewRelic(request, xClient);
  logRequest(request, event, tags);
};
