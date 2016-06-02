'use strict';
const shared = require('../shared');
const serv = shared.server;

function doPing(next) {
  return next(null, {message: 'pong'});
}

serv.method('doPing', doPing, {
  cache: {
    expiresIn: 10 * shared.MINUTE,
    staleIn: 5 * shared.MINUTE,
    staleTimeout: 4 * shared.MINUTE,
    generateTimeout: 100,
    segment: 'ping'
  }
});

module.exports.handlePing = function handlePing(request, reply) {
  serv.methods.doPing(function cb(error, result) {
    reply(error || result);
  });
};

module.exports.handleAlive = function handleAlive(request, reply) {
  reply({'message': 'I think therfore I am.'});
};
