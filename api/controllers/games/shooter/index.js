// jshint esversion: 6
'use strict';
const Game    = require('../../../models/gameModel'),
  minesweeper = require('../../../lib/minesweeper'),
  middlewares = require('../../../lib/middlewares'),
  validator   = require('../../../lib/validator'),
  error       = require('../../../config/error.json'),
  status      = require('../../../config/status.json').games,

  mongoose    = require('mongoose'),

  shooterPostSchema = require('../../../schemas/games/shooter/shooter_post.json'),
  TYPE = 2;


module.exports = function (router) {
  /**
   * @api {POST} api/games/shooter Create Game
   * @apiGroup Shooter
   * @apiName CreateGame
   * @apiPermission user signed in
   * @apiDescription Creates a new game
   *
   * @apiParam {Integer} difficulty the difficulty of the shooter game (1-10)
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
   * @apiUse MinError
   * @apiUse MaxError
  */
  router.route('/').post(middlewares.authenticate(), function (req, res, next) {
    var err;

    validator.validate(req.body, shooterPostSchema);
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
          difficulty: req.body.difficulty
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
   * @api {POST} api/games/shooter/:id/host Set Host
   * @apiGroup Shooter
   * @apiName GetShooter
   * @apiPermission user signed in
   * @apiDescription Sets the host for this game
   * @apiParam {String} id the id of the game.
   *
   * @apiSuccess {Boolean} success true iff successfully set.
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: true
   *     }
   * @apiUse NotFoundError
  */
  router.route('/:id/host').put(middlewares.authenticate(), function(req, res, next) {
    if (!mongoose.validID(req.params.id)) {
      return res.requestError(404, [{
          code: error.NOT_FOUND,
          fields: [ '#/id' ]
        }]);
    }
    return Game.findById(req.params.id).exec().then(function(game) {
      if (!game || game.type !== TYPE) {
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
      if (game.game.hasHost) {
        return res.sendResponse(true);
      }
      game.game.hasHost = true;
      game.markModified('game');
      return game.save().then(function() {
        return res.sendResponse(false);
      }).catch((err) => res.handleError(err));
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

  /**
   * @api {GET} api/games/shooter/:id Get Shooter Game
   * @apiGroup Shooter
   * @apiName GetShooter
   * @apiPermission user signed in
   * @apiDescription Get the configuration of the minesweeper game.
   * @apiParam {String} id the id of the game.
   *
   *
   * @apiSuccess {String} id the id of the game
   * @apiSuccess {String} host the id of the host for the game
   * @apiSuccess {String} status the status of the game
   * @apiSuccess {Integer} type The type of this game (always 2)
   * @apiSuccess {Object} game The shooter game
   * @apiSuccess {Object} game.difficulty The difficulty of the shooter game
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
   *         "type": 2,
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
      return res.sendResponse(game);
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
}