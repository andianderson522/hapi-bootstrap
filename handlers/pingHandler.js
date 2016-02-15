'use strict';

module.exports.handlePing = function handlePing(request, reply) {
  reply({'message': 'pong'});
};

module.exports.handleAlive = function handleAlive(request, reply) {
  reply({'message': 'I think therfore I am.'});
};
