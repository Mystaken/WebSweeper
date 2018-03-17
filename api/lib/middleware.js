// jshint esversion: 6
'use strict';

const Promise = require('bluebird'),
  User = require('../models/userModel');


module.exports = {

  /** Return the user information if user is authenticated.
   * Sends 401 Access Denied if user is not authenticated.
   *
   * @param {Object} opt Not used currently
   * @return {Function} the function that authenticates user
   */
  authenticate: function(opt) {
    var result = function(req, res, next) {
      // session not set.
      if (!req.session.user_id) {
        return res.requestError(401, {
          status: 401,
          data: [{
            code: error.ACCESS_DENIED,
          }]
        });
      }

      // check if session belongs to valid user
      return User.findById(req.session.user_id).exec().then(function(user) {
        if (!user) {
          return Promise.reject();
        }
        req.user = user;
        next();
      }).catch(function(err) {
        return res.requestError(401, {
          status: 401,
          data: [{
            code: error.ACCESS_DENIED,
          }]
        });
      });
    }
    return result;
  }
};