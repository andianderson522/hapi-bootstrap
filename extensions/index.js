'use strict';
var onRequest = require('./onRequest');
var onRequestError = require('./onRequestError');
var onTail = require('./onTail');
var preResponseExtension = require('./preResponseExtension');

exports.handleOnRequest = onRequest.handleOnRequest;

exports.handleOnRequestError = onRequestError.handleOnRequestError;

exports.handleTail = onTail.handleTail;

exports.handlePreResponse = preResponseExtension.handlePreResponse;
