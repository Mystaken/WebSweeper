import { Component, Input, Output, EventEmitter } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message = '';
  messages = [];

  @Input() gameId: '';
  @Output() closeChat = new EventEmitter();

  constructor(private _api: APIRoutingService, private _socket: SocketService) {

  }

  joinRoom(gameId) {
    this.messages = [];
    this._socket.joinRoom(gameId);
    this._socket.getMessage(msg => {
      console.log(msg);
      this.messages.push(msg.message);
    });
  }

  sendMessage() {
    console.log(this.gameId, this.message);
    this._socket.sendMessage(this.gameId, this.message);
    this.message = '';
  }
}
