'use strict';
const validate = require('uuid-validate');
const nodeUUID = require('node-uuid');

module.exports.isAUUID = function isAUUID(toCheck) {
  return validate(toCheck);
};

module.exports.generateUUID = function generateUUID() {
  return nodeUUID.v4();
};
