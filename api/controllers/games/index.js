// jshint esversion: 6
'use strict';

const Game = require('../../models/gameModel'),
  middlewares = require('../../lib/middlewares'),
  status      = require('../../config/status.json').games,

  gamePutSchema = require('../../schemas/games/games_put.json');
module.exports = function (router) {
  /**
   * @api {POST} api/games/ Create Game
   * @apiGroup Game
   * @apiName CreateGame
   * @apiPermission user signed in
   * @apiDescription Creates a new game
   *
   * @apiSuccess {String} id The id of the game
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "id": "5935ed0e5ecf04cc3388de8e"
   *       }
   *     }
   * @apiUse ExtraFieldsError
   * @apiUse InvalidLoginError
  */
  router.route('/').post(middlewares.authenticate(), function (req, res, next) {
    return new Game({
        host: req.user.id,
        username: req.user.username,
        status: status.NEW
      }).save().then(function(game) {
        return res.sendResponse({
          id: game._id
        });
      }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {

  });
};