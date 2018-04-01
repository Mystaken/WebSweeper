import { constants } from './../../environments/constants';
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
  selection: string;

  minesweeper: MinesweeperGame;

  shooter: ShooterGame;

  constructor(private _gameAPI: GameService,
    private _router: Router,) {
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
    this.shooter = { difficulty: null };
  }

  createMinesweeper():void {
    this._gameAPI.createMinesweeper(
      this.minesweeper.rows,
      this.minesweeper.columns,
      this.minesweeper.mines).subscribe(
        (res) => {
          this._router.navigate([`/games/${res.id}`]);
        },
        (err) => {
          Materialize.toast(err.data[0].code, 4000);
        },
      );
  }

  createShooter():void {
    this._gameAPI.createShooter(this.shooter.difficulty)
      .subscribe(
        (res) => {
          this._router.navigate([`/games/${res.id}`]);
        },
        (err) => {
          Materialize.toast(err.data[0].code, 4000);
        },
      );
  }

  getRooms():void {
    this._gameAPI.getAllGames(10, 300).subscribe(
      (res) => {
        this.rooms = res;
        this.rooms.reverse();
      },
      (err) => {
        Materialize.toast(err.data[0].code, 4000);
      },
    );
  }

  onSelectionChange(selection):void {
    this.selection = selection;
  }

  getGame(type:number):string {
    if (type === constants.GAME_TYPES.MINESWEEPER) {
      return 'Minesweeper';
    } else if (type === constants.GAME_TYPES.SHOOTER) {
      return 'Shooter';
    } else {
      return '';
    }
  }
}

interface MinesweeperGame {
  rows?:number;
  columns?:number;
  mines?:number;
}

interface ShooterGame {
  difficulty?:number;
}
