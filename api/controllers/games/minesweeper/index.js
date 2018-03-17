// jshint esversion: 6
'use strict';
const Game    = require('../../../models/gameModel'),
  minesweeper = require('../../../lib/minesweeper'),
  validator   = require('../../../lib/validator'),
  error       = require('../../../config/error.json'),
  status      = require('../../../config/status.json').games,

  minesweeperPostSchema = require('../../../schemas/games/minesweeper/minesweeper_post.json');

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
    return Game.findById(req.params.id, {
      id: "$id",
      _id: 0,
      host: 1,
      status: 1,
      config: 1,
      createdAt: 1
    }).exec().then(function(game) {
      console.log(game);
      if (!game) {
        return Promise.reject({
          status: 404,
          data: [{
            code: error.NOT_FOUND,
            fields: [ '#/id' ]
          }]
        });
      }
      if (game.game) {
        game.game.gameState = game.game.gameState.map(function(cell) {
          if (cell.status === 1) {
            return cell;
          } else {
            return {
              status: cell.status
            };
          }
        });
      }
      return res.sendResponse(game);
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
   * @apiParam {Integer} mines the number of mines in the game
   * @apiParam {Integer} x the the x coordinate of the move
   * @apiParam {Integer} y the y coordinate of the move
   * @apiParam {Integer} move 0 = reveal, 1 = toggle flag
   *
   *
   * @apiSuccess {Array} moves contains type (0=reveal, 1=flag, 2=unflag), n and m
   * @apiSuccess {Integer} status the status of the game (0=active, 1=loss)
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
   * @apiUse MissingFieldsError
   * @apiUse ExtraFieldsError
  */
  .post(function(req, res, next) {
    var err, newGame, moves, resStatus = 0;

    validator.validate(req.body, minesweeperPostSchema);
    err = validator.getLastErrors();

    if (err) {
      return res.requestError(400, err);
    }

    return Game.findById(req.params.id).exec().then(function(game) {
      // game does not exist
      if (!game) {
        return Promise.reject({
          status: 404,
          data: [{
            code: error.NOT_FOUND,
            fields: [ '#/id' ]
          }]
        });
      }
      if (game.status == status.NEW) {
        newGame = minesweeper.MineSweeper(req.body.n, req.body.m, req.body.mines);
        game.status = status.ACTIVE;
      } else {
        newGame = game.game;
      }
      // reveal
      if (req.body.move == 0) {
        moves = minesweeper.reveal(newGame, req.body.x, req.body.y);
        // Hit mine, game over!
        if (!moves.length && minesweeper.checkMine(newGame, req.body.x, req.body.y)) {
          resStatus = 1;
        }
      // flag
      } else {
        moves = minesweeper.flag(newGame, req.body.x, req.body.y);
      }
      game.game = newGame;
      return game.save();
    }).then(function() {
      return res.sendResponse({
        moves: moves,
        status: resStatus
      });
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
}