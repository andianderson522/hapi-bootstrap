'use strict';
const config = require('../config')();
const cache = config.cache;
const shared = require('../shared');

exports.generateCacheForEnv = function generateCacheForEnv(region) {
  return {
    expiresIn: cache.expiresInMinutes * shared.MINUTE,
    staleIn: cache.staleInMinutes * shared.MINUTE,
    staleTimeout: cache.staleTimeoutMinutes * shared.MINUTE,
    generateTimeout: cache.generateTimeout,
    segment: region
  };
};
