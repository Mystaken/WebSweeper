import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class PeerService {
  private _peer: any;
  private _id: string;
  private _conn: Array<any> = [];

  constructor() {
    this._peer = new Peer({key: environment.peerKey});
    this._peer.on('open', (id) => {
      this._id;
    });
  }

  getID = (cb: (id: string) => any):void => {
    this._peer.on('open', cb);
  }

  connect = (peer: string): void => {
    let conn = this._peer.connect(peer);
    this._conn.push(conn);
  }

  send = () => {
    this._conn.forEach((conn) => conn.send('hi'));
  }

  getData = (cb: (data: any) => any): void => {
    this._peer.on('connection', function(conn) {
      conn.on('data', cb);
    });
  }

  call = (id:string, stream: MediaStream): any => {
    return this._peer.call(id, stream)
  }

  answerStream = (cb: (stream: any) => any):any => {
    return this._peer.on('call', (call) => {
      call.answer(null);
      return call.on('stream', cb);
    });
  }
}
