// jshint esversion: 6
'use strict';
const Game = require('../../../models/gameModel'),
  sweeper  = require('../../../lib/minesweeper'),
  error    = require('../../../config/error.json');

module.exports = function (router) {

  /**
   * @api {GET} api/games/minesweeper/:id Get MineSweeper Game
   * @apiGroup MineSweeper
   * @apiName GetMineSweeper
   * @apiPermission user signed in
   * @apiDescription Get the configuration of the minesweeper game.
   * @apiParam {String} id the id of the game.
   *
   *
   * @apiSuccess {String} id the id of the game
   * @apiSuccess {String} host the id of the host for the game
   * @apiSuccess {String} status the status of the game
   * @apiSuccess {Object} config The minesweeper config
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "id": "5935ed0e5ecf04cc3388de8e",
   *         "host": "5935ed0e5ecf04cc3388de8e",
   *         "status": "N",
   *         "config": {},
   *         "createdAt": "21-12-2017 15:30",
   *       }
   *     }
   * @apiUse NotFoundError
  */
  router.route('/:id').get(function(req, res, next) {
    return Game.aggregate([{
      $match: {
        _id: req.params.id
      }
    },{
      $project: {
        id: "$id",
        _id: 0,
        host: 1,
        status: 1,
        config: 1,
        createdAt: 1
      }
    }]).exec().then(function(game) {
      if (!game || !game.length) {
        return Promise.reject({
          status: 404,
          data: [{
            code: error.NOT_FOUND,
            fields: [ '#/id' ]
          }]
        });
      }
      return res.sendResponse(game[0]);
    }).catch((err) => res.handleError(err));
  })

  /**
   * @api {POST} api/games/minesweeper/:id Update MineSweeper Game
   * @apiGroup MineSweeper
   * @apiName PostMineSweeper
   * @apiPermission user signed in
   * @apiDescription Get the configuration of the minesweeper game.
   * @apiParam {String} id the id of the game.
   * @apiParam {Integer} n the position on x-axis
   * @apiParam {Integer} m the position on y-axis
   * @apiParam {Integer} move 0 = reveal, 1 = toggle flag
   *
   *
   * @apiSuccess {Array} moves contains type (0=reveal, 1=flag, 2=unflag), n and m
   * @apiSuccess {Integer} status the status of the game (0=active, 1=win, 2=loss)
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         moves: [{
   *           type: 0,
   *           n: 1,
   *           m: 3,
   *         }],
   *        status: 0
   *       }
   *     }
   * @apiUse NotFoundError
  */
  .post(function(req, res, next) {

  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
}