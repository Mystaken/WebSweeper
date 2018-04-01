// jshint esversion: 6
'use strict';

var config = require('../config/config.json');

/**
 * @apiDefine ExtraFieldsError
 *
 * @apiError ExtraFields Extra fields in the request
 *
 * @apiErrorExample {json} ExtraFields
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "OBJECT_ADDITIONAL_PARAM",
 *           "fields": [ "#/burger" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFound Entity not found or inactive.
 *
 * @apiErrorExample {json} NotFound
 *     HTTP/1.1 404 Not Found
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "NOT_FOUND",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine ExistError
 *
 * @apiError Exist Entity already exists
 *
 * @apiErrorExample {json} Exist
 *     HTTP/1.1 409 Conflict
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "EXISTS",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine MissingFieldsError
 *
 * @apiError MissingFields Missing required fields in request
 *
 * @apiErrorExample {json} NotFound
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "OBJECT_MISSING_PROPERTY",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine MaxLengthError
 *
 * @apiError MaxLen Fields exceeds max length
 *
 * @apiErrorExample {json} MaxLen
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "MAX_LENGTH",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine MinLengthError
 *
 * @apiError MinLen Fields are below min length
 *
 * @apiErrorExample {json} MaxLen
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "MIN_LENGTH",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
 /**
 * @apiDefine MaxError
 *
 * @apiError Max Fields exceeds max size
 *
 * @apiErrorExample {json} Max
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "MAXIMUM",
 *           "fields": [ "#/size" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine MinError
 *
 * @apiError Min Fields are below min size
 *
 * @apiErrorExample {json} Min
 *     HTTP/1.1 400 Bad Request
 *     {
 *       status: 400,
 *       data: [
 *          {
 *           "code": "MINIMUM",
 *           "fields": [ "#/size" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine InvalidLoginError
 *
 * @apiError InvalidLogin Not logged in our log in fields not valid
 *
 * @apiErrorExample {json} InvalidLogin
 *     HTTP/1.1 401 Access Denied
 *     {
 *       status: 401,
 *       data: [
 *          {
 *           "code": "ACCESS_DENIED",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */

module.exports = function (router) {
  router.route('/').get(function (req, res, next) {

    return res.status(200).send(`${config.app.name} is live!`);
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};