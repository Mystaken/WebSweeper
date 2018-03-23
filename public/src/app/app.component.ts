import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows = 5;
  columns = 10;
  mines = 1;
  active=true;
  test = (a) => console.log(a);
}
