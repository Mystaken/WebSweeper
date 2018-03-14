'use strict';

var userModel = require('../../models/users/userModel'),
  sanitizer   = require('sanitizer'),
  validator   = require('../../lib/validator'),
  usersPostSchema = require('../../schemas/users/users_post.json');

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

module.exports = function (router) {
  /**
   * @api {POST} api/user/ Create User
   * @apiGroup User
   * @apiName PostUser
   * @apiPermission none
   * @apiDescription Creates a new user and sends a verification link to the email.
   *
   * @apiParam {String} username Username of the new user (min length = 3, max length = 20)
   * @apiParam {String} email Email of the new user (min length = 3, max length = 100)
   * @apiParam {String} password Password of the new user (min length = 8, max length = 20)
   * @apiParamExample {json} Sample Request Body
   *     {
   *       "username": "websweeper",
   *       "email": "example@mail.com",
   *       "password": "superpassword"
   *     }
   *
   * @apiSuccess {String} username Username of the new user
   * @apiSuccess {String} email Email of the new user
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "username": "websweeper",
   *         "email": "example@mail.com"
   *       }
   *     }
   * @apiUse ExistError
   * @apiUse MissingFieldsError
   * @apiUse ExtraFieldsError
   * @apiUse MaxLengthError
   * @apiUse MinLengthError
  */
  router.route('/').post(function(req, res, next) {
    var err;
    validator.validate(req.body, usersPostSchema);
    err = validator.getLastErrors();
    if (err) {
      res.requestError(400, err);
    }
  });

  /**
   * @api {GET} api/user/:id Get User Info
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission none
   * @apiDescription Return this user's information.
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
   *       status: 200,
   *       data: {
   *        "username": "websweeper",
   *        "email": "example@mail.com",
   *        "created_at": "21-12-2017 15:30",
   *        "updated_at": "21-12-2017 15:30"
   *       }
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  router.route('/:id').get(function(req, res, next) {

  })
  /**
   * @api {PATCH} api/user/:id Update User Info
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission must be same as login user
   * @apiDescription Update this user's information and return it's updated information.
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
   *       status: 200,
   *       data: {
   *         "username": "websweeperchanged",
   *         "email": "newexample@mail.com",
   *         "created_at": "21-12-2017 15:30",
   *         "updated_at": "21-12-2017 15:30"
   *       }
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  .patch(function(req, res, next) {
  });


  /**
   * @api {POST} api/users/verification/:ticket Verify User
   * @apiGroup Auth
   * @apiName VerifyUser
   * @apiPermission none
   * @apiDescription Verifies the user's email with the link sent to the email.
   *
   * @apiParam {String} ticket the ticket sent in the verification link
   *
   * @apiSuccess {HTML}  html the html to be displayed
   * @apiUse ExtraFieldsError
  */
  router.route('verification/:ticket').get(function(req, res, next) {
  });

  /**
   * @api {POST} api/users/:username/verification/resend/ Resend verification link
   * @apiGroup Auth
   * @apiName ResendLink
   * @apiPermission none
   * @apiDescription Re-sends the verification link to the given user's email.
   *
   * @apiParam {String} username the username to be resent
   *
   * @apiUse ExtraFieldsError
   * @apiUse NotFoundError
  */
  router.route('/:username/verification/resend').post(function(req, res, next) {
  });
};