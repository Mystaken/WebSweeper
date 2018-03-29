import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import {
  CanActivate,
  Router
} from '@angular/router';

@Injectable()
export class RootGuard implements CanActivate {
  constructor(
    private _userAPI: UserService,
    private _router: Router) {}
  canActivate() {
    return this._userAPI.isLoggedIn()
      .map((res) => {
        if (!res) {
          this._router.navigate(['/login']);
        } else {
          this._router.navigate(['/lobby']);
        }
        return true;
      });
  }
}