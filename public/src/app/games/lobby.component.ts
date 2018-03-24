import { Component } from '@angular/core';
import { GameService } from './game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  creatingGame: boolean = false;

  minesweeper: MinesweeperGame;

  constructor(private _gameAPI: GameService, private _router: Router) {
    this.resetGameMenu();
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
      });
  }
}

interface MinesweeperGame {
  rows:number;
  columns:number;
  mines?:number;
}