import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:String = '';
  pass:String = '';
  signUpUser:String = '';
  signUpPassword:String = '';
  signUpEmail:String = '';
  inSignIn: boolean = true;
  isSignedUp: boolean = false;

  constructor(private _userAPI: UserService, private _router: Router) {

  }

  signUp():void {
    this._userAPI.signUp(this.signUpUser, this.signUpPassword, this.signUpEmail)
      .subscribe(
        (res) => {
          this.isSignedUp = true;
        },
        (err) => {
          Materialize.toast(err.data[0].code, 4000);
        },
      );
  }

  signIn():void {
    this._userAPI.signIn(this.user, this.pass)
      .subscribe(
        (res) => {
          this._router.navigate(['/lobby']);
        },
        (err) => {
          Materialize.toast(err.data[0].code, 4000);
        },
      );
  }

  resetSignUp():void {
    if (this.isSignedUp) {
      this.signUpUser = "";
      this.signUpPassword = "";
      this.signUpEmail = "";
      this.isSignedUp = false;
    }
    this.inSignIn=true;
  }

}
