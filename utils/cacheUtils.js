'use strict';
const config = require('../config')();
const cache = config.cache;
const tools = require('@condenast/user-platform-utils');
const utils = tools.utils;
const constants = utils.constants;

exports.generateCacheForEnv = function generateCacheForEnv(region) {
  return {
    expiresIn: cache.expiresInMinutes * constants.MINUTE,
    staleIn: cache.staleInMinutes * constants.MINUTE,
    staleTimeout: cache.staleTimeoutMinutes * constants.MINUTE,
    generateTimeout: cache.generateTimeout,
    segment: region
  };
};
