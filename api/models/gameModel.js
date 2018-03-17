// jshint esversion: 6
'use strict';

const mongoose = require('mongoose'),
  status   = require('../config/status.json').game,
  config   = require('../config/config.json'),
  utils    = require('../lib/utils');


const gameSchema = mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: utils.objValues(status),
    required: true
  },
  game: {
    type: Object
  }
},{
  timestamps: true
});

const Game = mongoose.model('game', gameSchema);


module.exports = Game;