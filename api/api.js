// jshint esversion: 6
'use strict';

const express = require('express'),
  kraken      = require('kraken-js'),
  path        = require('path'),
  bodyParser  = require('body-parser'),
  cors        = require('cors'),
  session     = require('express-session'),
  bcrypt      = require('bcrypt'),
  app         = express(),
  server      = require('http').Server(app),
  io          = require('socket.io')(server),

  sockets     = require('./sockets')(io),
  logger      = require('./lib/logger'),
  config      = require('./config/config.json'),
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
// REMOVE START
app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './static/test.html'));
});
// REMOVE END
spec.configure({
  version: VERSION
  }).then(function() {
    return server.listen(config.app.PORT, function() {
      logger.info(config.app.name + ' started at PORT: ' + config.app.PORT);
    });
  }).catch(function(err) {
    logger.fatal(err);
  });