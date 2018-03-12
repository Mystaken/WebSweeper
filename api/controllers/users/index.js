'use strict';

var userModel = require('../../model/users/userModel'),
  config  = require('../../config/config.json');

/**
 * @apiDefine ExtraFieldsError
 *
 * @apiError ExtraFields Extra fields in the request
 *
 * @apiErrorExample {json} ExtraFields
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": "OBJECT_ADDITIONAL_PARAM",
 *       "fields": ["burger", "sandwich"] // will include all extra fields
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
 *       "code": "NOT_FOUND",
 *       "fields": ["username", "email"]
 *     }
 */
/**
 * @apiDefine ExistError
 *
 * @apiError Exist Entity already exists
 *
 * @apiErrorExample {json} Exist
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": "OBJECT_MISSING_PROPERTY",
 *       "fields": ["username", "email"]
 *     }
 */
/**
 * @apiDefine MissingFieldsError
 *
 * @apiError MissingFields Missing required fields in request
 *
 * @apiErrorExample {json} NotFound
 *     HTTP/1.1 409 Conflict
 *     {
 *       "code": "EXISTS",
 *       "fields": ["username", "email"] // will only include fields that already exists
 *     }
 */

module.exports = function (router) {
  /**
   * @api {POST} /user/ Create User
   * @apiGroup User
   * @apiName PostUser
   * @apiPermission none
   *
   * @apiParam {String} username Username of the new user
   * @apiParam {String} email Email of the new user
   * @apiParam {String} password Password of the new user
   * @apiParamExample {json} Sample Request Body
   *     {
   *       "username": "websweeper",
   *       "email": "example@mail.com",
   *       "password": "superpassword"
   *     }
   *
   * @apiSuccess {String}  message A Success Message
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Success"
   *     }
   * @apiUse ExistError
   * @apiUse MissingFieldsError
   * @apiUse ExtraFieldsError
  */
  router.route('/').post(function(req, res, next) {

  });

  /**
   * @api {GET} /user/:id Get User Info
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission none
   *
   * @apiParam {String} id the id of the user
   *
   * @apiSuccess {String}  username Username of the user
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created (DD-MM-YYYY HH:MM)
   * @apiSuccess {Date} updated_at  The date this user was last updated (DD-MM-YYYY HH:MM)
   *
   *
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       "username": "websweeper",
   *       "email": "example@mail.com",
   *       "created_at": "21-12-2017 15:30",
   *       "updated_at": "21-12-2017 15:30"
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  router.route('/:id').get(function(req, res, next) {

  })
  /**
   * @api {PATCH} /user/:id Update User Info
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission must be same as login user
   *
   * @apiParam {String} id the id of user
   * @apiParam {String} username (Optional) the new username of user
   * @apiParam {String} email (Optional) the new email of user
   * @apiParamExample {json} Sample Request Body
   *     {
   *       "username": "websweeperchanged",
   *       "email": "newexample@mail.com"
   *     }
   * @apiSuccess {String}  username Username of the user.
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created (DD-MM-YYYY HH:MM).
   * @apiSuccess {Date} updated_at  The date this user was last updated (DD-MM-YYYY HH:MM).
   *
   *
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       "username": "websweeperchanged",
   *       "email": "newexample@mail.com",
   *       "created_at": "21-12-2017 15:30",
   *       "updated_at": "21-12-2017 15:30"
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  .patch(function(req, res, next) {

  });
};