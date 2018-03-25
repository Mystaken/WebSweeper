import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'shooter',
  templateUrl: './shooter.component.html',
  styleUrls: ['./shooter.component.css']
})
export class ShooterComponent {
  @Input() height: number = 500;
  @Input() width: number = 900;
  @Input() difficulty: number = 0;
  spectating = true;

  constructor(private p: PeerService) {}
 }