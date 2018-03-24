// jshint esversion: 6
'use strict';

const Game    = require('../../models/gameModel'),
  validator   = require('../../lib/validator'),
  middlewares = require('../../lib/middlewares'),
  status      = require('../../config/status.json').games,
  error       = require('../../config/error.json'),

  moment   = require('moment'),
  mongoose = require('mongoose'),

  gamesGetAllSchema = require('../../schemas/games/games_get_all.json');

module.exports = function (router) {

  /**
   * @api {GET} api/games Get All Games
   * @apiGroup Game
   * @apiName GetLobby
   * @apiPermission user signed in
   * @apiDescription Returns all the most updated games

   * @apiParam limit {Integer} The max number of game to return
   * @apiParam offset {Integer} (Optional) The number of games to skip
   * @apiParam staleness {Integer} (Optional) Amount of time prior to current time to include.
   * @apiParamExample {json} Sample Request
   *     {
   *       "limit": 1,
   *       "offset": 0,
   *       "staleness": 300
   *     }
   * @apiSuccess {Object[]} games the list of games
   * @apiSuccess {String} games.host the id of the host
   * @apiSuccess {String} games.id the id of the lobby
   * @apiSuccess {Date} games.createAt the create date of the lobby
   * @apiSuccess {Date} games.updatedAt the date the lobby was last updated
   * @apiSuccess {Date} game.username the username of the host
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: [{
   *         "host": "5935ed0e5ecf04cc3388de8e",
   *         "id": "5e3bba1234c0e5e4a34fae8e",
   *         "createdAt": "21-12-2017 15:30",
   *         "updatedAt": "21-12-2017 15:30",
   *         "username": "Hello Kitty"
   *       }]
   *     }
   * @apiUse MinError
   * @apiUse ExtraFieldsError
   * @apiUse InvalidLoginError
   * @apiUse MissingFieldsError
  */
  router.route('/').get(middlewares.authenticate(), function(req, res, next) {
    var err, query, matchQuery;

    //validation
    if (req.query.limit) {
      req.query.limit = parseInt(req.query.limit, 10);
    }
    if (req.query.offset) {
      req.query.offset = parseInt(req.query.offset, 10);
    }
    if (req.query.staleness) {
      req.query.staleness = parseInt(req.query.staleness, 10);
    }
    validator.validate(req.query, gamesGetAllSchema);
    err = validator.getLastErrors();
    if (err) {
      return res.requestError(400, err);
    }

    matchQuery = {
      status: {
        $nin: [ status.NEW ]
      }
    };

    if (req.query.staleness) {
      matchQuery.updatedAt = {
        $gte: moment().subtract(req.query.staleness, 'seconds').toDate()
      };
    }
    //get rooms
    query = Game.aggregate([{
      $match: matchQuery
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
          updatedAt: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$updatedAt"
            }
          }
        }
      }])
      .sort({
        updatedAt: 'asc'
      })
      .limit(req.query.limit);

    if (req.query.offset) {
      query.skip(req.query.offset);
    }

    return query.exec().then(function(games) {
      return res.sendResponse(games);
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

  /**
   * @api {GET} api/games/:id/info Get Games Information
   * @apiGroup Game
   * @apiName GetLobby
   * @apiPermission user signed in
   * @apiDescription Returns information for this game.
   *
   * @apiParam id {Integer} The id of the game.
   *
   * @apiSuccess {Object} game the game
   * @apiSuccess {String} game.host the id of the host
   * @apiSuccess {String} game.id the id of the lobby
   * @apiSuccess {Date} game.createAt the create date of the lobby
   * @apiSuccess {Date} game.updatedAt the date the lobby was last updated
   * @apiSuccess {Date} game.username the username of the host
   * @apiSuccess {Date} game.type the type of this game
   * @apiSuccess {Date} game.status the status of this game
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "host": "5935ed0e5ecf04cc3388de8e",
   *         "id": "5e3bba1234c0e5e4a34fae8e",
   *         "status": "P",
   *         "createdAt": "21-12-2017 15:30",
   *         "updatedAt": "21-12-2017 15:30",
   *         "username": "Hello Kitty",
   *         "type": 1
   *       }
   *     }
   * @apiUse InvalidLoginError
   * @apiUse NotFoundError
  */
  router.route('/:id/info').get(middlewares.authenticate(), function(req, res, next) {
    if (!mongoose.validID(req.params.id)) {
      return res.requestError(404, [{
          code: error.NOT_FOUND,
          fields: [ '#/id' ]
        }]);
    }
    return Game.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id)
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
        type: 1
      }
    }]).exec().then(function(games) {
      if (!games.length) {
        return Promise.reject({
          status: 404,
          data: [{
            code: error.NOT_FOUND,
            fields: [ '#/id' ]
          }]
        });
      }
      return res.sendResponse(games[0]);
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};
