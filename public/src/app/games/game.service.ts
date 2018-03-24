import { Injectable } from '@angular/core';
import { APIService } from '../services/api.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GameService {
  constructor(private _api: APIService) {}

  createMinesweeper(rows:number, columns:number, mines:number): Observable<any> {
    return this._api.post('games/minesweeper/', {
      n: rows,
      m: columns,
      mines: mines
    });
  }

  getGame(id:String): Observable<any> {
    return this._api.get(`games/${id}/info`, {});
  }
}