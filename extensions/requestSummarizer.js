'use strict';
const config = require('../config')();

exports.summarize = function summarize(request) {
  const summary = {
    id: request.id,
    url: request.raw.req.url.toString(),
    method: request.raw.req.method,
    env: config.mode,
    userAgent: request.headers['user-agent'],
    requestIp: request.info.remoteAddress,
    referrer: request.info.referrer,
    xClient: request.headers['x-client'],
    xForwardedFor: request.headers['x-forwarded-for']
  };
  if (request.route.settings.tags && request.route.settings.tags.length) {
    summary.endpoint = request.route.settings.tags[0];
  }
  return summary;
};
