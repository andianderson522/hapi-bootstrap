'use strict';
const Hoek = require('hoek');

function isJsonApiRequest(request) {
  const accept = request.headers.accept;
  if (!accept) {
    return false;
  }
  if (accept.indexOf('application/vnd.api+json') > -1) {
    return true;
  }
  if (accept.indexOf('application/json') > -1) {
    return true;
  }
  return false;
}

module.exports.handlePreResponse = function handlePreResponse(request, reply) {
  const internals =  {
  };
  const response = request.response;
  if (request.method === 'options') {
    return reply.continue();
  }
  if (response.isBoom) {
    const error = {
      title: response.output.payload.error,
      status: response.output.statusCode,
      detail: response.output.payload.message
    };
    response.output.payload = {
      errors: [error],
      meta: Hoek.applyToDefaults({id: request.id}, internals.meta)
    };
    response.output.headers['content-type'] = 'application/vnd.api+json';
  } else if (isJsonApiRequest(request)) {
    if (response.source) {
      response.source.meta = Hoek.applyToDefaults({id: request.id}, internals.meta);
    }
    response.headers['content-type'] = 'application/vnd.api+json';
  }
  return reply.continue();
};
