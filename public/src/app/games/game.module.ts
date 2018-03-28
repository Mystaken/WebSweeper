import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { environment } from '../../environments/environment';

import { MinesweeperBoardComponent } from './minesweeper/minesweeper-board.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { GameComponent } from './game.component';
import { ChatComponent } from './chat/chat.component';
import { LobbyComponent } from './lobby.component';
import { ShooterComponent } from './shooter/shooter.component';
import { ShooterGameComponent } from './shooter/shooter-game.component';

import { PeerService } from '../services/peer.service';
import { APIService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { MinesweeperService } from './minesweeper/minesweeper.service';
import { ShooterService } from './shooter/shooter.service';
import { ChatService } from './chat/chat.service';
import { GameService } from './game.service';

const config: SocketIoConfig = { url: environment.domain, options: {path: '/socket'} };

@NgModule({
  declarations: [
    MinesweeperBoardComponent,
    MinesweeperComponent,
    GameComponent,
    LobbyComponent,
    ChatComponent,
    ShooterComponent,
    ShooterGameComponent
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
    APIService,
    PeerService,
    UserService,
    MinesweeperService,
    ShooterService,
    GameService,
    ChatService
  ]
})

export class GameModule { }
