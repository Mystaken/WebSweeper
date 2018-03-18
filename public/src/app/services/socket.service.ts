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

  getMessage(cb: Function) {
    return this.socket.on('listen message', cb);
  }
}
