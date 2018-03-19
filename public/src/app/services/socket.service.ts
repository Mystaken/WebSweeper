import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  joinRoom(room) {
    this.socket.emit('join chat room', room);
  }

  sendMessage(room, msg) {
    this.socket.emit('chat message', {room: room, message: msg});
  }

  getMessage(callback: Function) {
    return this.socket.on('listen message', callback);
  }

  newMove(callback: Function) {
    return this.socket.on('new minesweeper move', callback);
  }
}
