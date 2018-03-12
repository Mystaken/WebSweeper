// jshint esversion: 6
'use strict';

const express = require('express'),
  kraken      = require('kraken-js'),
  path        = require('path'),
  bodyParser  = require('body-parser'),
  cors        = require('cors'),
  logger      = require('./lib/logger'),

  config      = require('./config/config.json'),
  APP_DIR     = path.join(__dirname, config.app.APP_DIR),
  app         = express(),
  spec        = require('./lib/spec')(app);


app.use(bodyParser.json())
  .use(kraken(spec.onconfig))
  .use(express.static(APP_DIR));

spec.configure({}).then(function() {
    return app.listen(config.app.PORT, function() {
      logger.info(config.app.name + ' started at PORT: ' + config.app.PORT);
    });    
  }).catch(function(err) {
    logger.fatal(err);
  });