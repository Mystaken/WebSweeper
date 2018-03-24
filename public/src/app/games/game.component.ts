import { constants } from './../../environments/constants';
import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { GameService } from './game.service';


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  private _id: String;
  type: number;

  constructor(
    private _route:ActivatedRoute,
    private _gameAPI: GameService) {
    this._id = this._route.snapshot.params['id'];
    this._gameAPI.getGame(this._id).subscribe((res) => {
      this.type=res.type;
    });
  }
}