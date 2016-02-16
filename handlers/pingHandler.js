'use strict';
var shared = require('../shared');
var serv = shared.server;

function doPing(next) {
  return next(null, {message: 'pong'});
}

// var MONTH = 2629746000;
var SECOND = 1000;
var MINUTE = 60 * SECOND;

serv.method('doPing', doPing, {
  cache: {
    expiresIn: 10 * MINUTE,
    staleIn: 5 * MINUTE,
    staleTimeout: 4 * MINUTE,
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
