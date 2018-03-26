// jshint esversion: 6
'use strict';

module.exports = function(io, socket) {

  /**
   * @param msg {Object}
   *    - room
   *    - message
   */
  socket.on('chat message', function(msg) {
    io.sockets.in(msg.room).emit('listen message', msg);
  });
}