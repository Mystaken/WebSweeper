import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { ShooterService } from './shooter.service';
import { ActivatedRoute } from '@angular/router';
import { ShooterGameComponent } from './shooter-game.component';
@Component({
  selector: 'shooter',
  templateUrl: './shooter.component.html',
  styleUrls: ['./shooter.component.css']
})
export class ShooterComponent {
  @Input() height: number = 500;
  @Input() width: number = 900;
  @Input() difficulty: number = 0;
  @ViewChild('shooter') shooterRef: ShooterGameComponent;
  @ViewChild('stream') streamRef;

  isHost: boolean = true;
  constructor(
    private _route:ActivatedRoute,
    private _shooterAPI: ShooterService) {
    if (this._route.snapshot.params['id'] != '5ab7fd3bc7b6f11c955e98db') {
      this.isHost = false;
    }
  }
  ngOnInit() {
    if (this.isHost) {
      this._shooterAPI.onNewPeer((id) => {
        this._shooterAPI.streamCanvas(id, this.shooterRef.getCanvas().captureStream())
      });
    } else {
      this._shooterAPI.onAnswer((stream) => {
        console.log(this.streamRef.nativeElement, stream);
        this.streamRef.nativeElement.srcObject = stream;
      });
      this._shooterAPI.sendPeers();
    }
  }
 }