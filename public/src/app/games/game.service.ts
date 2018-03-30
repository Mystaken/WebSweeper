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

  createMinesweeper(rows: number, columns: number, mines: number): Observable<any> {
    return this._api.post('games/minesweeper/', {
      n: rows,
      m: columns,
      mines: mines
    });
  }

  createShooter(difficulty: number): Observable<any> {
    return this._api.post('games/shooter/', {
      difficulty: difficulty
    });
  }

  getGame(id: string): Observable<any> {
    return this._api.get(`games/${id}/info`, {});
  }

  joinRoom(room: string): void {
    this._socket.emit('join room', room);
  }

  getAllGames(limit:number, staleness:number, offset?: number): Observable<any> {
    return this._api.get(`games`, {
      limit: limit,
      staleness: staleness,
      offset: offset
    });
  }

  logout(): Observable<any> {
    return this._api.post('api/users/logout');
  }
}
