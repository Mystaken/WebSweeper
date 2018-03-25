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
  GAME_TYPES = constants.GAME_TYPES;
  id: string;
  type: number;

  constructor(
    private _route:ActivatedRoute,
    private _gameAPI: GameService) {
    this.id = this._route.snapshot.params['id'];
  }
  
  ngOnInit() {
    this._gameAPI.getGame(this.id).subscribe((res) => {
      this.type=res.type;
      console.log("Minesweeper?!?")
    });
  }
}