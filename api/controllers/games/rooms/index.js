// jshint esversion: 6
'use strict';

const Game = require('../../../models/gameModel');

module.exports = function (router) {
  /**
   * @api {GET} api/games/rooms Get All Rooms
   * @apiGroup Game
   * @apiName GetLobby
   * @apiPermission user signed in
   * @apiDescription Returns all the most updated rooms

   * @apiParam limit {Integer} The max number of rooms to return
   * @apiParam offset {Integer} (Optional) The number of rooms to skip
   * @apiParamExample {json} Sample Request
   *     {
   *       "limit": 1,
   *       "offset": 0
   *     }
   * @apiSuccess {Object[]} rooms the list of rooms
   * @apiSuccess {String} rooms.host the id of the host
   * @apiSuccess {String} rooms.id the id of the lobby
   * @apiSuccess {Date} rooms.createAt the create date of the lobby
   * @apiSuccess {Date} rooms.updatedAt the date the lobby was last updated
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: [{
   *         "host": "5935ed0e5ecf04cc3388de8e",
   *         "id": "5e3bba1234c0e5e4a34fae8e",
   *         "createdAt": "21-12-2017 15:30",
   *         "updatedAt": "21-12-2017 15:30"
   *       }]
   *     }
   * @apiUse MinError
   * @apiUse ExtraFieldsError
   * @apiUse InvalidLoginError
   * @apiUse MissingFieldsError
  */
  router.route('/').get(function(req, res, next) {

  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};