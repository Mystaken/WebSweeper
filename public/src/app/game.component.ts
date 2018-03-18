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
  rooms = [];

  isLobby = true;
  isCreateGame = false;
  isChatOpen = false;
  isInGame = false;

  @ViewChild('ms') ms: MinesweeperComponent
  @ViewChild('cht') cht: ChatComponent

  constructor(private _api: APIRoutingService) {
    this.getRooms();
  }

  getRooms() {
    this._api.get('/api/games/rooms/?limit=10', {}).subscribe((res) => {
      this.rooms = res;
    });
  }

  createGame() {
    this._api.post('/api/games/', {
    }).subscribe((res) => {
      this.gameId = res.id;
      this.ms.createBoard(true);

      this.cht.joinRoom(res.id);
    });

    this.isLobby = false;
    this.isCreateGame = false;
    this.isChatOpen = false;
    this.isInGame = true;
  }

  backToLobby() {
    this.getRooms();
    
    this.isLobby = true;
    this.isCreateGame = false;
    this.isChatOpen = false;
    this.isInGame = false;
  }

  showCreategame() {
    this.row = undefined;
    this.col = undefined;
    this.mines = undefined;

    this.isLobby = false;
    this.isCreateGame = true;
    this.isChatOpen = false;
    this.isInGame = false;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = false;
  }
}
