import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MinesweeperBoardComponent } from './minesweeper/minesweeper-board.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby.component';

import { APIService } from '../services/api.service';
import { MinesweeperService } from './minesweeper/minesweeper.service';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    MinesweeperBoardComponent,
    MinesweeperComponent,
    GameComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    GameComponent
  ],
  providers: [
    MinesweeperService,
    APIService,
    GameService
  ]
})

export class GamesModule { }