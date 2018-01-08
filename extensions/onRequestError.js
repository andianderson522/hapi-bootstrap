'use strict';
const log = require('../logger');

function logError(request, err) {
  err.route = request.url.path;
  log.error({route: request.url.path, err: err, stack: err.stack});
}

exports.handleOnRequestError = function handleOnRequestError(request, err) {
  log.debug('handleOnRequestError');
  logError(request, err);
};
