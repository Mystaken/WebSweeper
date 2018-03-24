import { Injectable } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MinesweeperService {
  constructor(private _api: APIService) {
  }

  flag(id:String, row:number, column:number): Observable<any> {
    return this._api.post(`games/minesweeper${id}`, {
      x: column,
      y: row,
      move: 1
    });
  }

  reveal(id:String, row:number, column:number): Observable<any> {
    return this._api.post(`games/minesweeper${id}`, {
      x: column,
      y: row,
      move: 0
    });
  }
}