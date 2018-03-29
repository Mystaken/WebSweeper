import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { APIService } from '../services/api.service';


@Injectable()
export class UserService {
  constructor(private _api: APIService) {}

  private _profile: UserProfile;

  getProfile():Observable<UserProfile> {
    if (this._profile) {
      return Observable.create((observer) => {
        observer.next(this._profile);
      });
    } else  {
      return this._api.get('users').map((res) => {
        this._profile = res;
        return res;
      });
    }
  }

  clearProfile():void {
    this._profile = undefined;
  }

  uploadAvatar(avatar: File):Observable<any> {
    return this.getProfile()
      .flatMap((profile) => this._api.upload(`users/${profile.id}/avatar`, {
        'avatar': avatar
      }));
  }

  updateProfile(username, email):Observable<any> {
    return this.getProfile()
      .flatMap((profile) => this._api.patch(`users/${profile.id}`, {
        'username': username,
        'email': email,
      }));
  }

  signUp(username: String, password: String, email: String): Observable<any> {
    return this._api.post('users/', {
      username: username,
      email: email,
      password: password
    });
  }


  signIn(username: String, password: String): Observable<any> {
    return this._api.post('users/login', {
      username: username,
      password: password
    });
  }
}

export interface UserProfile {
  id?:string,
  username?:string,
  email?:string,
  lastLogin?:string,
  createdAt?:string
}
