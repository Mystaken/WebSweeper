import { Component, ViewChild } from '@angular/core';
import { MinesweeperComponent } from './minesweeper.component';
import { ChatComponent } from './chat.component';
import { APIRoutingService } from './services/api-routing.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  row;
  col;
  mines;
  gameId = '';

  isLobby = true;
  isCreateGame = false;
  isChatOpen = false;
  isInGame = false;

  @ViewChild('ms') ms: MinesweeperComponent
  @ViewChild('cht') cht: ChatComponent

  constructor(private _api: APIRoutingService) {

  }

  createGame() {
    this._api.post('/api/games/', {
    }).subscribe((res) => {
        this.gameId = res.id;
        this.ms.createBoard(true);
    });

    this.isLobby = false;
    this.isCreateGame = false;
    this.isChatOpen = false;
    this.isInGame = true;
  }

  backToLobby() {
    this.isLobby = true;
    this.isCreateGame = false;
    this.isChatOpen = false;
    this.isInGame = false;
  }

  showCreategame() {
    this.isLobby = false;
    this.isCreateGame = true;
    this.isChatOpen = false;
    this.isInGame = false;
  }
}
