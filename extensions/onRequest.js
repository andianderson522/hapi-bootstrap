'use strict';
const log = require('../logger');

exports.handleOnRequest = function handleOnRequest(request, event, tags) {
  log.debug('handeling onRequest: ' + request.method + ' ' + request.path + ' ' + tags);
};
