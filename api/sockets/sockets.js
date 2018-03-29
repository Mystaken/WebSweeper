// jshint esversion: 6
'use strict';
const chat = require('./chat.js'),
  webrtc   = require('./webrtc'),
  io = require('socket.io')({
    path: '/socket'
  });

module.exports = {
  init: function(server, session) {
    io.attach(server);
    // get session
    io.use(function(socket, next) {
      session(socket.request, socket.request.res, next);
    });

    //check if authenicated
    io.use(function(socket, next) {
      if (!socket.request.session.user) {
        return next(new Error('authentication error'));
      }
      return next();
    });

    io.on('connection', function(socket) {
      socket.on('join room', function(room) {
        socket.join(room);
      });

      socket.on('disconnect', function() {
      });

      socket.on('leave room', function(room) {
        socket.leave(room);
      });
      chat(io, socket);
      webrtc(io, socket);
    });
    this.io = io;
  }
}