// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {
  socket.on('join room', function(room) {
    socket.join(room);
  });

  /**
   * @param msg {Object}
   *    - room
   *    - message
   */
  socket.on('chat message', function(msg) {
    io.sockets.in(msg.room).emit('listen message', msg);
  });

  socket.on('leave room', function(room) {
    socket.leave(room);
  });
}