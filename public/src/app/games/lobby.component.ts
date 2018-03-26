import { Component } from '@angular/core';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  creatingGame: boolean = false;
  rooms = [];

  minesweeper: MinesweeperGame;

  constructor(private _gameAPI: GameService,
    private _router: Router) {
    this.resetGameMenu();
    this.getRooms();
  }

  createGame():void {
    this.creatingGame = true;
  }

  exitCreateGame():void {
    this.creatingGame = false;
  }

  resetGameMenu():void {
    this.minesweeper = { rows: null, columns: null, mines: null };
  }

  createMinesweeper() {
    this._gameAPI.createMinesweeper(
      this.minesweeper.rows,
      this.minesweeper.columns,
      this.minesweeper.mines).subscribe(res => {
        this._router.navigate([`/games/${res.id}`]);
      },
      (err) => {
        Materialize.toast(err.data[0].code, 4000);
      });
  }

  getRooms() {
    this._gameAPI.getAllGames(10, 300).subscribe((res) => {
      this.rooms = res;
      this.rooms.reverse();
    },
    (err) => {
      Materialize.toast(err.data[0].code, 4000);
    });
  }
}

interface MinesweeperGame {
  rows?:number;
  columns?:number;
  mines?:number;
}
