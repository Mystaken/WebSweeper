import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { environment } from '../../environments/environment';

import { MinesweeperBoardComponent } from './minesweeper/minesweeper-board.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby.component';

import { APIService } from '../services/api.service';
import { MinesweeperService } from './minesweeper/minesweeper.service';
import { GameService } from './game.service';

const config: SocketIoConfig = { url: environment.domain, options: {path: '/socket'} };

@NgModule({
  declarations: [
    MinesweeperBoardComponent,
    MinesweeperComponent,
    GameComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
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