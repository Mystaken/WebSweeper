import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows = 10;
  columns = 5;
  mines = 5;
  active=true;
  test = (a) => console.log(a);
}
