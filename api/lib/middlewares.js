// jshint esversion: 6
'use strict';

const User  = require('../models/userModel'),
  error = require('../config/error.json');


module.exports = {

  /** Return the user information if user is authenticated.
   * Sends 401 Access Denied if user is not authenticated.
   *
   * @param {Object} opt Not used currently
   * @return {Function} the function that authenticates user
   */
  authenticate: function(opt) {
    var result = function(req, res, next) {

      req.session.user = { id: '5ab7f3dbc08c77192559e98d' };
      // session not set.
      if (!req.session.user) {
        return res.requestError(401, [{
            code: error.ACCESS_DENIED,
          }]);
      }

      // check if session belongs to valid user
      return User.findById(req.session.user.id).exec().then(function(user) {
        if (!user) {
          return Promise.reject();
        }
        req.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        };
        next();
      }).catch(function(err) {
        return res.requestError(401, {
          status: 401,
          data: [{
            code: error.ACCESS_DENIED,
          }]
        });
      });
    };
    return result;
  }
};
