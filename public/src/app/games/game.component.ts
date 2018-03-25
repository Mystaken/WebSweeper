import { constants } from './../../environments/constants';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './game.service';


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  /** List of game types
   * 1: Minesweeper
   */
  GAME_TYPES = constants.GAME_TYPES;

  /** id of the game */
  id: string;

  /* Type of game. Refer to GAME_TYPES */
  type: number;

  chatOpen:boolean = false;
  missedMessages: number = 0;

  constructor(
    private _route:ActivatedRoute,
    private _gameAPI: GameService) {
    this.id = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this._gameAPI.getGame(this.id).subscribe((res) => {
      this.type=res.type;
      this._gameAPI.joinRoom(this.id);
    });
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    this.missedMessages = 0;
  }

  closeChat() {
    this.chatOpen = false;
    this.missedMessages = 0;
  }

  addMissedMessage(msg) {
    if (!this.chatOpen) {
      this.missedMessages += 1;
    }
  }
}