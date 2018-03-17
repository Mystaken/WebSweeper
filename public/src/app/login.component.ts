import { Component, OnInit } from '@angular/core';
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

  constructor(private _api: APIRoutingService) {

  }

  signUp() {
    this._api.post('/api/user/', {
      'username': this.username,
      'email': this.email,
      'password': this.password,
    }).subscribe((res) => console.log(res));
  }

  signIn() {
    this._api.post('/api/users/login', {
      'username': this.username,
      'password': this.password,
    }).subscribe((res) => console.log(res));
  }
}
