// jshint esversion: 6
'use strict';
const config = require('../config/config.json'),
  path = require('path'),
  APP_DIR = path.join(__dirname, '..', config.app.APP_DIR);

module.exports = function () {
  return function (req, res, next) {
    return res.sendFile('index.html', { root: APP_DIR });
  };
};