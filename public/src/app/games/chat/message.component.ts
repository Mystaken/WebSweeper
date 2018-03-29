import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../users/user.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message:string = "";
  @Input() user: UserProfile;
  @Input() messageColor: string = 'white';
  colorHash = new ColorHash();

  getUserColor() {
    return this.colorHash.hex(this.user.id);
  }

  getUserAvatar() {
    return `${environment.domain}/api/users/${this.user.id}/avatar`
  }
}