// jshint esversion: 6
'use strict';

const express = require('express'),
  kraken      = require('kraken-js'),
  path        = require('path'),
  bodyParser  = require('body-parser'),
  cors        = require('cors'),
  session     = require('express-session'),
  bcrypt    = require('bcrypt'),

  logger      = require('./lib/logger'),
  config      = require('./config/config.json'),
  app         = express(),
  spec        = require('./lib/spec')(app),

  APP_DIR     = path.join(__dirname, config.app.APP_DIR),
  VERSION     = bcrypt.hashSync((new Date()).toString(), 10).substring(7);


app.use(bodyParser.json())
  .use(kraken(spec.onconfig))
  .use(express.static(APP_DIR))
  .use(session({
    secret: VERSION,
    resave: false,
    saveUninitialized: true,
  }));

spec.configure({
  version: VERSION
  }).then(function() {
    return app.listen(config.app.PORT, function() {
      logger.info(config.app.name + ' started at PORT: ' + config.app.PORT);
    });
  }).catch(function(err) {
    logger.fatal(err);
  });