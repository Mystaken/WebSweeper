// jshint esversion: 6
'use strict';
const Game    = require('../../../models/gameModel'),
  minesweeper = require('../../../lib/minesweeper'),
  middlewares = require('../../../lib/middlewares'),
  validator   = require('../../../lib/validator'),
  error       = require('../../../config/error.json'),
  status      = require('../../../config/status.json').games,
  io          = require('../../../sockets/sockets').io,

  mongoose    = require('mongoose'),

  minesweeperIDPostSchema = require('../../../schemas/games/minesweeper/minesweeper_id_post.json'),
  minesweeperPostSchema = require('../../../schemas/games/minesweeper/minesweeper_post.json'),
  TYPE = 1;

module.exports = function (router) {

  /**
   * @api {POST} api/games/minesweeper Create Game
   * @apiGroup MineSweeper
   * @apiName CreateGame
   * @apiPermission user signed in
   * @apiDescription Creates a new game
   *
   * @apiParam {Integer} n the length on x-axis
   * @apiParam {Integer} m the length on y-axis
   * @apiParam {Integer} mines the number of mines in the game
   *
   * @apiSuccess {Object} id the id of the game
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
    var err;

    validator.validate(req.body, minesweeperPostSchema);
    err = validator.getLastErrors();

    if (err) {
      return res.requestError(400, err);
    }

    return new Game({
        host: req.user.id,
        username: req.user.username,
        type: TYPE,
        status: status.NEW,
        game: {
          n: req.body.n,
          m: req.body.m,
          mines: req.body.mines
        }
      }).save().then(function(game) {
        return res.sendResponse({
          id: game._id
        });
      }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

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
   * @apiSuccess {Integer} type The type of this game (always 1)
   * @apiSuccess {Object} game The minesweeper game
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "id": "5935ed0e5ecf04cc3388de8e",
   *         "host": "5935ed0e5ecf04cc3388de8e",
   *         "status": "N",
   *         "game": {},
   *         "createdAt": "21-12-2017 15:30",
   *         "createdAt": "21-12-2017 15:30",
   *         "type": 1,
   *       }
   *     }
   * @apiUse NotFoundError
  */
  router.route('/:id').get(middlewares.authenticate(), function(req, res, next) {
    if (!mongoose.validID(req.params.id)) {
      return res.requestError(404, [{
          code: error.NOT_FOUND,
          fields: [ '#/id' ]
        }]);
    }
    return Game.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
        type: TYPE
      }
    },{
      $project: {
        id: "$_id",
        _id: 0,
        host: 1,
        username: 1,
        createdAt: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$createdAt"
          }
        },
        status: 1,
        updatedAt: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$updatedAt"
          }
        },
        type: 1,
        game:1
      }
    }]).exec().then(function(games) {
      var game;
      if (!games.length) {
        return Promise.reject({
          status: 404,
          data: [{
            code: error.NOT_FOUND,
            fields: [ '#/id' ]
          }]
        });
      }
      game = games[0];
      if (game.game.gameState) {
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
   * @apiParam {String} id the id of the game
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
  .post(middlewares.authenticate(), function(req, res, next) {
    var err, newGame, moves, resStatus = 0;

    validator.validate(req.body, minesweeperIDPostSchema);
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
      // can only modify if host
      if (!game.host.equals(req.user.id)) {
        return Promise.reject({
          status: 403,
          data: [{
            code: error.FORBIDDEN,
            fields: [ '#/id' ]
          }]
        });
      }
      if (game.status == status.NEW) {
        newGame = minesweeper.MineSweeper(game.game.n, game.game.m, game.game.mines);
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
      io.sockets.to(g._id).emit('new minesweeper move', result);
      return res.sendResponse(result);
    }).catch((err) => res.handleError(err));
  });
};
