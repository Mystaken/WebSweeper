import { Component, Input } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private _api: APIRoutingService) {

  }
}
