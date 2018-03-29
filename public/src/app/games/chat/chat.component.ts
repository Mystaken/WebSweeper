import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { UserProfile } from '../../users/user.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() id: string;
  @Output() onNewMessage:EventEmitter<{ user: UserProfile, message: string}> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  messages: Array<{ user: UserProfile, message: string}> = [];

  newMessage: string;
  private _isOpen: boolean = true;

  constructor(private _chatAPI: ChatService) {}

  ngOnInit() {
    this._chatAPI.getMessage((res) => {
      this.messages.push(res);
      this.onNewMessage.emit(res);
    });
  }

  sendMessage():void {
    this._chatAPI.sendMessage(this.id, this.newMessage);
    this.newMessage = "";
  }

  clear(): void {
    this.messages = [];
  }

  closeMessage() {
    this.onClose.emit(true);
  }
}
