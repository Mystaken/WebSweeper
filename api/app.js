// jshint esversion: 6
'use strict';

const express  = require('express'),
  kraken       = require('kraken-js'),
  path         = require('path'),
  bodyParser   = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors         = require('cors'),
  bcrypt       = require('bcrypt'),
  app          = express(),
  server       = require('http').Server(app),
  expressSess  = require('express-session'),
  ExpressPeerServer = require('peer').ExpressPeerServer,

  config    = require('./config/config.json'),
  sockets   = require('./sockets/sockets'),
  sessionDB = require('./lib/sessionStore')(expressSess),
  logger    = require('./lib/logger'),
  spec      = require('./lib/spec')(app),

  PORT    = process.env.PORT || config.app.PORT,
  APP_DIR = path.join(__dirname, config.app.APP_DIR),
  VERSION = bcrypt.hashSync((new Date()).toString(), 10).substring(7),
  secret  = bcrypt.hashSync((new Date()).toString(), 3).substring(7);

const session = expressSess({
    secret: secret,
    store: sessionDB,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  });

app.use(bodyParser.json())
  .use(cookieParser())
  .use(kraken(spec.onconfig))
  .use(session)
  .use('/peer', ExpressPeerServer(server, {}))
  .use('/api/doc', express.static('doc'))
  .use(express.static('.build'))
  .use(cors())

sockets.init(server, session);

spec.configure({
  version: VERSION
  }).then(function() {
    return server.listen(PORT, function() {
      logger.info(`${config.app.name} started at PORT: ${config.app.DOMAIN}/${PORT}`);
    });
  }).catch(function(err) {
    logger.fatal(err);
  });
