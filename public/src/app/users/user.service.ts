import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { APIService } from '../services/api.service';


@Injectable()
export class UserService {
  constructor(private _api: APIService) {}

  private _profile: UserProfile = undefined;

  getProfile():Observable<UserProfile> {
    if (this._profile) {
      return Observable.of(this._profile);
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

  isLoggedIn(): Observable<boolean> {
    return this.getProfile()
      .map((profile) => profile === undefined)
      .catch((res) =>  Observable.of(false));
  }

  uploadAvatar(avatar: File):Observable<any> {
    return this.getProfile()
      .flatMap((profile) => this._api.upload(`users/${profile.id}/avatar`, {
        'avatar': avatar
      }));
  }

  updateProfile(username, email):Observable<UserProfile> {
    return this.getProfile()
      .flatMap((profile) => this._api.patch(`users/${profile.id}`, {
        'username': username,
        'email': email,
      }));
  }

  signUp(username: String, password: String, email: String): Observable<{username:string, email:string}> {
    return this._api.post('users/', {
      username: username,
      email: email,
      password: password
    });
  }


  signIn(username: String, password: String): Observable<UserProfile> {
    return this._api.post('users/login', {
      username: username,
      password: password
    }).map((profile) => {
      this._profile = profile;
      return profile;
    });
  }

  signOut(): Observable<any> {
    if (!this._profile) {
      return Observable.of();
    } else {
      return this._api.post('users/logout')
        .map(() => this.clearProfile());
    }
  }
}

export interface UserProfile {
  id?:string,
  username?:string,
  email?:string,
  lastLogin?:string,
  createdAt?:string
}
