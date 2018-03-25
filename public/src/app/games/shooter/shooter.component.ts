import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';


@Component({
  selector: 'shooter',
  templateUrl: './shooter.component.html',
  styleUrls: ['./shooter.component.css']
})
export class ShooterComponent {
  height = 500;
  width = 900;
  spectating = true;
 }