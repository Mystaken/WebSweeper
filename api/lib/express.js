// jshint esversion: 6
'use strict';

const express = require('express'),
  path      = require('path'),
  ERROR     = require('../config/error.json');

var version;



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
      data : response,
      version: version
    });
  };

  /** Sends a 403 status if route exist but verb is incorrect.
   */
  response.invalidVerb = function () {
    return this.status(403).json({
      status: 403,
      version: version
    });
  };

  /** Sends a error response.
   * @param err.status {int}  the error response status
   * @param err.message {str} the error message
   */
  response.requestError = function(status, message) {
    return this.status(status).json({
      status: status,
      data: message,
      version: version
    });
  };

  /** Sends a error response if user does not have permission
   * @param err {Object} Not being used.
   */
  response.forbidden = function (err) {
    this.status(403).json({
      status: 403,
      data: ERROR.FORBIDDEN,
      version: version
    });
  };

  /** Handles an error and sends correct response.
   * @param err {Object} The err being handled
   */
  response.handleError = function(err) {
    if (err && err.status) {
      this.requestError(err.status, err.data);
    } else {
      console.log(err);
      this.status(500).end();
    }
  };
}

module.exports = {
    /** Configures the Express app
     * @param app {Express} the express app
     */
    configure: function (app, opt) {
        configureRequest(express.request, opt);
        configureResponse(express.response, opt);
        version = opt.version;
        return Promise.resolve();
    }
};