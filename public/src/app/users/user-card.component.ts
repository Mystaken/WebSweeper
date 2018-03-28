import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  username: string = '';
  password: string = '';

  @ViewChild('avatarUpload') avatarUpload
  @Output() onClose = new EventEmitter()

  constructor(private _userAPI: UserService) {}

  uploadAvatar() {
    let avatar:File = this.avatarUpload.nativeElement.files[0];
    if (!avatar) {
      return;
    }
    console.log(avatar);
    return this._userAPI.uploadAvatar(avatar).subscribe((res) => console.log(res));
  }

  toggleProfile() {
    this.onClose.emit('close');
  }
}
