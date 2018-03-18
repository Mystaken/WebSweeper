// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {
  socket.on('join chat room', function(room) {
    socket.join(`chat_${room}`);
  });

  /**
   * @param msg {Object}
   *    - room
   *    - message
   */
  socket.on('chat message', function(msg){
    io.sockets.in(`chat_${msg.room}`).emit('listen message', msg);
  });

  socket.on('leave chat room', function(room) {
    socket.leave(`chat_${room}`);
  });
}