// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {
  socket.on('create peer', function(msg) {
    socket.broadcast.emit('new peer', msg);
  });
}