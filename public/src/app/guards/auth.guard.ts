import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _userAPI: UserService,
    private _router: Router) {}
  canActivate() {
    return this._userAPI.isLoggedIn()
      .map((res) => {
        if (!res) {
          this._router.navigate(['/login']);
        }
        return res;
      });
  }
}