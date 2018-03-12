'use strict';

var userModel = require('../../model/users/userModel'),
  config  = require('../../config/config.json');
module.exports = function (router) {
  /**
   * @api {POST} /user/:id Create User
   * @apiName PostUser
   * @apiGroup User
   * @apiPermission none
   *
   * @apiParam {String} username Username of the new user.
   * @apiParam {String} email Email of the new user.
   * @apiParam {String} password Password of the new user.
   *  
   * @apiSuccess {String}  username Username of the user.
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created.
   * @apiSuccess {Date} updated_at  The date this user was last updated.
   * @apiParamExample {json} Request-Example:
   *     {
   *       "username": "websweeper",
   *       "email": "example@mail.com",
   *       "password": "superpassword"
   *     }
  */
  router.post('/', function(req, res, next) {

  });
};