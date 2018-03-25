import { Injectable } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Observable } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MinesweeperService {
  constructor(
    private _api: APIService,
    private _socket: Socket) {
  }

  flag(id:String, row:number, column:number): Observable<any> {
    return this._api.post(`games/minesweeper/${id}`, {
      x: column,
      y: row,
      move: 1
    });
  }

  reveal(id:String, row:number, column:number): Observable<any> {
    return this._api.post(`games/minesweeper/${id}`, {
      x: column,
      y: row,
      move: 0
    });
  }

  getBoard(id:string): Observable<any> {
    return this._api.get(`games/minesweeper/${id}`, {});
  }

  joinRoom(room) {
    this._socket.emit('join chat room', room);
  }

  newMove(callback: Function) {
    return this._socket.on('new minesweeper move', callback);
  }
}