import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { ShooterService } from './shooter.service';
import { ActivatedRoute } from '@angular/router';
import { difficulty, ShooterConfig } from './shooter-difficulty';
import { ShooterGameComponent } from './shooter-game.component';
import { UserService, UserProfile } from '../../users/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'shooter',
  templateUrl: './shooter.component.html',
  styleUrls: ['./shooter.component.css']
})
export class ShooterComponent {
  @Input() height: number = 500;
  @Input() width: number = 900;
  @ViewChild('shooter') shooterRef: ShooterGameComponent;
  @ViewChild('stream') streamRef;

  config: ShooterConfig = difficulty[0];
  id: string;
  isHost: boolean;

  constructor(
    private _route:ActivatedRoute,
    private _shooterAPI: ShooterService,
    private _user: UserService) {
    this.id = this._route.snapshot.params['id'];
  }
  ngOnInit() {
    this._shooterAPI.getGame(this.id).subscribe((game) => {
      this._user.getProfile().subscribe((user) => {
        if (!game) { return; }
        if (game.host === user.id) {
          return this._shooterAPI.setHost(this.id)
            .subscribe((success) => {
              if (!success) {
                this.setHost();
              } else {
                this.setSpectator();
              }
            });
        }
        this.setSpectator();
      });
      this.config = difficulty[game.game.difficulty];
    });
  }

  private setHost():void {
    this.isHost = true;
    this._shooterAPI.onNewPeer((id) => {
      this._shooterAPI.streamCanvas(id, this.shooterRef.getCanvas().captureStream());
    });
  }

  private setSpectator():void {
    this.isHost = false;
    this._shooterAPI.onAnswer((stream) => {
      this.streamRef.nativeElement.srcObject = stream;
    });
    this._shooterAPI.sendPeers();
  }
 }