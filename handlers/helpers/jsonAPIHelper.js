'use strict';
const Boom = require('boom');

exports.validateAcceptHeader = function validateAcceptHeader(request) {
  const accept = request.headers.accept;
  if (!accept) {
    throw Boom.notAcceptable();
  }
  if (accept.indexOf('application/vnd.api+json') < 0) {
    throw Boom.unsupportedMediaType('only "application/vnd.api+json" supported');
  }
};
