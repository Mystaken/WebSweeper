import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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
  isSignedUp: boolean = false;

  constructor(private _loginAPI: LoginService, private _router: Router) {

  }

  signUp():void {
    this._loginAPI.signUp(this.signUpUser, this.signUpPassword, this.signUpEmail)
      .subscribe((res) => {
        this.isSignedUp = true;
      });
  }

  signIn():void {
    this._loginAPI.signIn(this.user, this.pass)
      .subscribe((res) => {
        this._router.navigate(['/lobby']);
      });
  }

  resetSignUp():void {
    if (this.isSignedUp) {
      this.signUpUser = "";
      this.signUpPassword = "";
      this.signUpEmail = "";
      this.isSignedUp = false;
    }
  }

}
