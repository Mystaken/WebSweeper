// jshint esversion: 6
'use strict';

const mongoose = require('mongoose'),
  status   = require('../config/status.json').users,
  config   = require('../config/config.json'),
  utils    = require('../lib/utils');


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: utils.objValues(status),
    required: true
  },
  lastLogin: {
    type: Date,
    required: true
  }
},{
  timestamps: true
});

const User = mongoose.model('users', userSchema);


module.exports = User;