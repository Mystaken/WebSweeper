'use strict';

var express = require('./express'),
  mongoose  = require('./mongoose');


module.exports = function(app) {
  return {
    configure: function (opt) {
      return mongoose.configure(app, opt).then(function() {
        return express.configure(app, opt);
      });
    },
    onconfig: function (config, next) {
      next(null, config);
    }
  };
};