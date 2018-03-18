import { Component, Input } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private _api: APIRoutingService, private _socket: SocketService) {
    this._socket.joinRoom('123');
    this._socket.sendMessage('123', 'Yo');
    this._socket.getMessage().subscribe((res) => console.log(res));
  }
}
