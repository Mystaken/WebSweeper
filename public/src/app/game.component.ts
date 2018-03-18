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
  row = 8;
  col = 8;
  mines = 10;
  gameId = '';
  
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
  }
}
