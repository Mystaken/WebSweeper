import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { APIService } from './api.service';


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
}

export interface UserProfile {
  id?:string,
  username?:string,
  email?:string,
  lastLogin?:string,
  createdAt?:string
}