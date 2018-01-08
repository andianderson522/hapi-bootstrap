'use strict';
const onRequest = require('./onRequest');
const onRequestError = require('./onRequestError');
const preResponseExtension = require('./preResponseExtension');

exports.handleOnRequest = onRequest.handleOnRequest;

exports.handleOnRequestError = onRequestError.handleOnRequestError;

exports.handlePreResponse = preResponseExtension.handlePreResponse;
