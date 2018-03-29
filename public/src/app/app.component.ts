import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colorHash = new ColorHash();
  user = {
    id:'123',
    username:'mystaken',
    email:'123',
    lastLogin:'123',
    createdAt:'123',
    avatar:'http://localhost:3000/api/users/980/avatar'
  }
  message="a very long message a very long message a very long message a very long message"
  constructor() {
  }
}
