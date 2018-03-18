// jshint esversion: 6
'use strict';

const Game    = require('../../../models/gameModel'),
  minesweeper = require('../../../lib/minesweeper'),
  validator   = require('../../../lib/validator');

module.exports = function (router) {
  /**
   * @api {GET} api/games/lobby Get All lobbies
   * @apiGroup MineSweeper
   * @apiName GetLobby
   * @apiPermission user signed in
   * @apiDescription Returns all the most updated lobbies

   * @apiParams limit {Integer} The max number of lobbies to return
   * @apiParams offset {Integer} The number of lobbies to skip
   *
   *
   *
   *
  */
  router.route('/').get(function(req, res, next) {

  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};