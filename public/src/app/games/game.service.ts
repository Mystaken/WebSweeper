import { Injectable } from '@angular/core';
import { APIService } from '../services/api.service';
import { Observable } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';

@Injectable()
export class GameService {
  constructor(
    private _api: APIService,
    private _socket: Socket) {
  }

  createMinesweeper(rows:number, columns:number, mines:number): Observable<any> {
    return this._api.post('games/minesweeper/', {
      n: rows,
      m: columns,
      mines: mines
    });
  }

  getGame(id:string): Observable<any> {
    return this._api.get(`games/${id}/info`, {});
  }

  joinRoom(room: string) {
    this._socket.emit('join room', room);
  }
}
