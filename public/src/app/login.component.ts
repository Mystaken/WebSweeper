import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIRoutingService } from './services/api-routing.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  pass = '';
  username = '';
  password = '';
  email = '';
  isSignedUp = false;

  constructor(private _api: APIRoutingService, private _router: Router) {

  }

  signUp() {
    this._api.post('/api/users/', {
      'username': this.username,
      'email': this.email,
      'password': this.password,
    }).subscribe((res) => {
      this.isSignedUp = true;
    });
  }

  signIn() {
    this._api.post('/api/users/login', {
      'username': this.user,
      'password': this.pass,
    }).subscribe((res) => {
      this._router.navigate(['/game']);
    });
  }
}
