import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class PeerService {
  private _peer: any;
  constructor() {
    this._peer = new Peer({key: environment.peerKey});
    console.log(this._peer);
  }
}