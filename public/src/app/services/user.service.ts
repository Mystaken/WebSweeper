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
      return new Observable((observer) => {
        observer.next(this._profile);
      });
    } else {
      return this._api.get('users');
    }
  }

  clearProfile():void {
    this._profile = undefined;
  }
}

export interface UserProfile {
  id?:string,
  username?:string,
  email?:string,
  lastLogin?:string,
  createdAt?:string
}