import { Component, Input } from '@angular/core';
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

  constructor(private _api: APIRoutingService, private _socket: SocketService) {
    this._socket.joinRoom(this.gameId);
    this._socket.getMessage(msg => {
      console.log(msg);
      this.messages.push(msg.message);
    });
  }

  sendMessage() {
    this._socket.sendMessage(this.gameId, this.message);
    this.message = '';
  }
}
