'use strict';
const onRequest = require('./onRequest');
const onRequestError = require('./onRequestError');
const onTail = require('./onTail');
const preResponseExtension = require('./preResponseExtension');

exports.handleOnRequest = onRequest.handleOnRequest;

exports.handleOnRequestError = onRequestError.handleOnRequestError;

exports.handleTail = onTail.handleTail;

exports.handlePreResponse = preResponseExtension.handlePreResponse;
