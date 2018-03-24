import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { APIService } from '../services/api.service';

@Injectable()
export class LoginService {
  constructor(private _api: APIService) {
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