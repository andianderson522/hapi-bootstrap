'use strict';

// FIXME replace with actual health checks
exports.checkStubHealth = function checkStubHealth(cb) {
  return cb(null, '[PASSED]; Stubbed health check');
};
