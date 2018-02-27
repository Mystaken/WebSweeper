'use strict';

var express = require('express'),
  Promise   = require('bluebird'),
  path      = require('path'),
  ERROR     = require('../config/error.json');


/** Configures the functions to the request object.
 * @param request {Express.request} the request object
 */
function configureRequest (request) {
}


/* Configures the functions to the response object.
 * @param response {Express.response} the response object
 */
function configureResponse (response) {
  /** Sends a 200 request from API with the data.
   * This function should be used instead of request.send
   */
  response.sendResponse = function (response) {
    return this.status(200).json({
      status: 200,
      data : response
    });
  };

  /** Sends a 403 status if route exist but verb is incorrect.
   */
  response.invalidVerb = function () {
    return this.status(403).json({
      status: 403
    });
  };

  /** Sends a error response. If no status is given, send 
      a status 500 response with no message.
   * @param err.status {int}  the error response status
   * @param err.message {str} the error message
   */
  response.requestError = function(status, message) {
    return this.status(status).json({
      status: status,
      message: message
    });
  };

  /** Sends a error response if user does not have permission
   * @param err {Object} Not being used.
   */
  response.forbidden = function (err) {
    this.status(403).json({
      status: 403,
      message: ERROR.FORBIDDEN
    });
  };
}

module.exports = {
    /** Configures the Express app
     * @param app {Express} the express app
     */
    configure: function (app, opt) {
        configureRequest(express.request, opt);
        configureResponse(express.response, opt);
        return Promise.resolve();
    }
};