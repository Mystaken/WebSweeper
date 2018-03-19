// jshint esversion: 6
'use strict';

const Game    = require('../../../models/gameModel'),
  validator   = require('../../../lib/validator'),
  middlewares = require('../../../lib/middlewares'),
  status      = require('../../../config/status.json').games,

  moment      = require('moment'),

  roomsGetSchema = require('../../../schemas/games/rooms/rooms_get.json');

module.exports = function (router) {
  /**
   * @api {GET} api/games/rooms Get All Rooms
   * @apiGroup Game
   * @apiName GetLobby
   * @apiPermission user signed in
   * @apiDescription Returns all the most updated rooms

   * @apiParam limit {Integer} The max number of rooms to return
   * @apiParam offset {Integer} (Optional) The number of rooms to skip
   * @apiParam staleness {Integer} (Optional) Amount of time prior to current time to include.
   * @apiParamExample {json} Sample Request
   *     {
   *       "limit": 1,
   *       "offset": 0,
   *       "staleness": 300
   *     }
   * @apiSuccess {Object[]} rooms the list of rooms
   * @apiSuccess {String} rooms.host the id of the host
   * @apiSuccess {String} rooms.id the id of the lobby
   * @apiSuccess {Date} rooms.createAt the create date of the lobby
   * @apiSuccess {Date} rooms.updatedAt the date the lobby was last updated
   * @apiSuccess {Date} rooms.username the username of the host
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
    validator.validate(req.query, roomsGetSchema);
    err = validator.getLastErrors();
    if (err) {
      return res.requestError(400, err);
    }

    matchQuery = {
      status: {
        $nin: [ status.PENDING ]
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

    return query.exec().then(function(rooms) {
      return res.sendResponse(rooms);
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};
