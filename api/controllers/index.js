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
 *           "fields": [ "#/burger", "#/sandwich" ] // will include all extra fields
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
 *           "fields": [ "#/username", "#/email" ]
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
 *           "code": "Min_LENGTH",
 *           "fields": [ "#/username" ]
 *         }
 *       ]
 *     }
 */
/**
 * @apiDefine InvalidLoginError
 *
 * @apiError InvalidLogin Fields are below min length
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