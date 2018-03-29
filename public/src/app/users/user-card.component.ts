import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  isProfileOpen: boolean = false;

  username: string;
  email: string;
  id: string;
  // Set the default avatar to a white image
  avatar: string = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

  @ViewChild('avatarUpload') avatarUpload

  constructor(private _userAPI: UserService) {}

  ngOnInit() {
    this._userAPI.getProfile().subscribe(
      (res) => {
        this.username = res.username;
        this.email = res.email;
        this.id = res.id;
        this.refreshAvatar();
      },
      (err) => {
        Materialize.toast(err.data[0].code, 4000);
      },
    );
  }

  refreshAvatar() {
    this.avatar = `api/users/${this.id}/avatar?timestamp=${+new Date()}`;
  }

  uploadAvatar() {
    let avatar:File = this.avatarUpload.nativeElement.files[0];
    if (!avatar) {
      return;
    }
    return this._userAPI.uploadAvatar(avatar).subscribe(
      (res) => {
        Materialize.toast('Avatar uploaded', 4000);
        this.refreshAvatar();
        this.closeProfile();
      },
      (err) => {
        Materialize.toast(err.data[0].code, 4000);
      },
    );
  }

  updateProfile() {
    return this._userAPI.updateProfile(this.username, this.email).subscribe(
      (res) => {
        Materialize.toast('Profile updated', 4000);
        this.closeProfile();
      },
      (err) => {
        Materialize.toast(err.data[0].code, 4000);
      },
    );
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }
}
