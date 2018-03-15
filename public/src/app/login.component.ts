import { Component, OnInit } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _api: APIRoutingService) {

  }

  signUp() {
    this._api.get('/', {})
      .subscribe((res) => console.log(res));
  }
}
