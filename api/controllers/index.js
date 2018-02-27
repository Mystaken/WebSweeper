'use strict';
var config = require('../config/config.json');

module.exports = function (router) {
  router.route('/').get(function (req, res, next) {

    return res.status(200).send(`${config.app.name} is live!`);
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });
};