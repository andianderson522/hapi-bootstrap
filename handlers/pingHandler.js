'use strict';
const shared = require('../shared');
const serv = shared.server;
const utils = require('../utils');
const cacheUtils = utils.cacheUtils;
const log = require('../logger');
const tools = require('@condenast/user-platform-utils');
const helpers = tools.helpers;
const jsonAPIHelper = helpers.jsonAPIHelper;

function doPing(next) {
  log.info('Calling real doPing()');
  return next(null, {message: 'pong'});
}

serv.method('doPing', doPing, {
  cache: cacheUtils.generateCacheForEnv('ping')
});

module.exports.handlePing = function handlePing(request, reply) {
  jsonAPIHelper.validateAcceptHeader(request);
  serv.methods.doPing(function cb(error, result) {
    reply(error || result);
  });
};

module.exports.handleAlive = function handleAlive(request, reply) {
  jsonAPIHelper.validateAcceptHeader(request);
  reply({message: 'I think therfore I am.'});
};
