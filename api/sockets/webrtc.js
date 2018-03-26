// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {
  var test = true;
  socket.on('create peer', function(msg) {
    console.log(msg);
    socket.broadcast.emit('new peer', msg);
  });
}