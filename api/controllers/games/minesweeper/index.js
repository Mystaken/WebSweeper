// jshint esversion: 6
'use strict';
const Game    = require('../../../models/gameModel'),
  minesweeper = require('../../../lib/minesweeper'),
  validator   = require('../../../lib/validator'),
  error       = require('../../../config/error.json'),
  status      = require('../../../config/status.json').games,
  io     = require('../../../sockets/sockets').io,

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
      id: "$_id",
      _id: 0,
      host: 1,
      status: 1,
      config: 1,
      createdAt: 1
    }).exec().then(function(game) {
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
   * @apiParam {Integer} n the length on x-axis
   * @apiParam {Integer} m the length on y-axis
   * @apiParam {Integer} mines the number of mines in the game
   * @apiParam {Integer} x the the x coordinate of the move
   * @apiParam {Integer} y the y coordinate of the move
   * @apiParam {Integer} move 0 = reveal, 1 = toggle flag
   * @apiParamExample {json} Sample Request
   *     {
   *       "n": 5,
   *       "m": 5,
   *       "mines": 10,
   *       "x": 2,
   *       "y": 2,
   *       "move": 1,
   *     }
   *
   * @apiSuccess {Object[]} moves the list of moves to make
   * @apiSuccess {Integer} moves.type the type of the move(0=reveal,1=flag,2=unflag)
   * @apiSuccess {Integer} moves.n the position on the x-axis of the move
   * @apiSuccess {Integer} moves.m the position on the y-axis of the move
   * @apiSuccess {Integer} moves.number (only if type=0) The number to be displayed
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
   *           number: 1 // only if type=0
   *         }],
   *        status: 0
   *       }
   *     }
   * @apiUse NotFoundError
   * @apiUse MissingFieldsError
   * @apiUse ExtraFieldsError
   * @apiUse MinError
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
      game.markModified('game');
      return game.save();
    }).then(function(g) {
      var result = {
        moves: moves,
        status: resStatus
      };
      io.sockets.in('new minesweeper move', result);
      return res.sendResponse(result);
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};