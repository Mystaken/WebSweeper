import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';
import { APIService } from '../../services/api.service';
import { PeerService } from '../../services/peer.service';

@Injectable()
export class ShooterService {
  constructor(
    private _api: APIService,
    private _socket: Socket,
    private _peer: PeerService) {
  }

  sendPeers(): any {
    this._peer.getID((id) => this._socket.emit('create peer', id));
  }

  onNewPeer(callback: (res: any) => any) {
    return this._socket.on('new peer', callback);
  }

  streamCanvas = (id: string, canvas: MediaStream):any => this._peer.call(id, canvas);

  onAnswer = (cb: (stream: any) => any):any => this._peer.answerStream(cb);
}