import { Injectable } from '@angular/core';
import { APIService } from '../../services/api.service';
import { UserProfile } from '../../users/user.service';
import { Observable } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {
  constructor(
    private _api: APIService,
    private _socket: Socket) {
  }

  sendMessage(room:string, message:string):void {
    return this._socket.emit('chat message', {room: room, message: message});
  }


  getMessage(callback: (res: {user: UserProfile; message: string}) => any) {
    return this._socket.on('listen message', callback);
  }
}
