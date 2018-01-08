'use strict';
const Joi = require('joi');

exports.defaultHeaderJoi = Joi.object({
  'x-client': Joi.string().max(20).example('swagger').required().description('the calling client identifier')
}).unknown(true);
