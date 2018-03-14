'use strict';

var express = require('./express'),
  mongoose  = require('./mongoose'),
  validator = require('./validator'),
  logger    = require('./logger');


module.exports = function(app) {
  return {
    configure: function (opt) {
      return mongoose.configure(app, opt).then(function() {
        logger.info('Mongoose configured');
        return express.configure(app, opt);
      }).then(function() {
        logger.info('Express configured');
        return validator.configure(app, opt);
      }).then(function() {
        logger.info('Validator configured');
      });
    },
    onconfig: function (config, next) {
      next(null, config);
    }
  };
};