// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {
  socket.on('join room', function(room) {
    socket.join(`chat_${room}`);
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('leave room', function(room) {
    socket.leave(`chat_${room}`);
  });
}