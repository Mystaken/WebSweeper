import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @ViewChild('avatarUpload') avatarUpload
  constructor(private _userAPI: UserService) {}

  uploadAvatar() {
    let avatar:File = this.avatarUpload.nativeElement.files[0];
    if (!avatar) {
      return;
    }
    console.log(avatar);
    return this._userAPI.uploadAvatar(avatar).subscribe((res) => console.log(res));
  }
}
