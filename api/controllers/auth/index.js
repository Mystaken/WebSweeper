'use strict';

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
 *       "fields": ["username"]
 *     }
 */
module.exports = function (router) {
  /**
   * @api {POST} /auth/verification/:ticket Verify User
   * @apiGroup Auth
   * @apiName VerifyUser
   * @apiPermission none
   *
   * @apiParam {String} ticket the ticket sent in the verification link
   *
   * @apiSuccess {HTML}  html the html to be displayed
   * @apiUse ExtraFieldsError
  */
  router.route('verification/:ticket').get(function(req, res, next) {
  });

  /**
   * @api {POST} /auth/verification/:ticket Resend verification link
   * @apiGroup Auth
   * @apiName ResendLink
   * @apiPermission none
   *
   * @apiParam {String} username the username to be resent
   *
   * @apiUse ExtraFieldsError
   * @apiUse NotFoundError
  */
  router.route('resend/:username').post(function(req, res, next) {
  });
};