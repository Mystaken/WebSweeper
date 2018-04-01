import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { ShooterConfig } from './shooter-difficulty';


@Component({
  selector: 'shooter-game',
  templateUrl: './shooter-game.component.html',
  styleUrls: ['./shooter-game.component.css']
})
export class ShooterGameComponent {
  /* icon source used */
  @Input() playerIconSrc: string;
  @Input() projectileIconSrc: string;
  @Input() enemyIconSrc: string;

  /* The height of the game */
  @Input() height: number;

  /* The height of the game */
  @Input() width: number;

  @Input()
  config = {
    speed: {
      player: 8,
      enemy: 1,
      shots: 10
    },
    respawn: 1,
    invincible: 1000,
    hpLoss: 10,
    maxEnemy: 10,
    enemyHP: 1,
    playerHP: 100000
  };

  @ViewChild('shooter') shooterRef;
  /* The canvas element */
  canvas;
  ctx;

  /* Keys for keypress */
  KEYS = {
      UP: 119,
      RIGHT: 100,
      DOWN: 115,
      LEFT: 97,
    };

  /* Keys for key_down */
  KEY_DOWN = {
      UP: 87,
      RIGHT: 68,
      DOWN: 83,
      LEFT: 65,
    };


  /* The player character */
  player: Player;

  /* The enemy objects */
  enemies: Array<Enemy>;

  /* The enemy objects */
  shots: Array<Projectile>;

  /* Player icons */
  playerIcon;
  enemyIcon;
  projectileIcon;

  /* Position of the canvas */
  x: number;
  y: number;

  lastNewAI: number;

  pause: Boolean = false;

  score: number = 0;

  constructor(private _el: ElementRef) {
    this.playerIcon = new Image();
    this.enemyIcon = new Image();
    this.projectileIcon = new Image();
  }


  movePlayer() {
    let newX = this.player.x + this.player.x_change * this.config.speed.player,
      newY = this.player.y + this.player.y_change * this.config.speed.player;
    if (newX >= 0 && newX + this.playerIcon.width  < this.width) {
      this.player.x = newX;
    }
    if (newY >= 0 && newY + this.playerIcon.width < this.height) {
      this.player.y = newY;
    }
  }

  fireShots() {
    var i, scale;
    if (this.player.shoot) {
      scale = Math.max(
          Math.abs(this.player.shoot.x - this.x - this.player.x),
          Math.abs(this.player.shoot.y - this.y - this.player.y)) / this.config.speed.shots;
      this.shots.push({
        x: this.player.x,
        y: this.player.y,
        x_change: (this.player.shoot.x - this.player.x - this.x) / Math.max(scale, 0.01),
        y_change: -(this.player.shoot.y - this.y - this.player.y) / Math.max(scale, 0.01)
      });
      this.player.shoot = undefined;
    }
    for(i=this.shots.length - 1;i>=0;i--) {
      this.shots[i].x += this.shots[i].x_change;
      this.shots[i].y -= this.shots[i].y_change;
      if (this.shots[i].x < 0 ||
        this.shots[i].y < 0 ||
        this.shots[i].x + this.projectileIcon.width > this.width ||
        this.shots[i].y + this.projectileIcon.height > this.height) {
        this.shots.splice(i, 1);
      }
    }
  }
  handleAI() {
    let currTime = +new Date();
    for (let i = 0; i< this.enemies.length; i++) {
      //chase
      if (this.enemies[i].type == 0) {
        let scale = Math.max(
            Math.abs(this.player.x - this.enemies[i].x),
            Math.abs(this.player.y - this.enemies[i].y)) / this.config.speed.enemy;
        this.enemies[i].x += (this.player.x - this.enemies[i].x) / Math.max(scale, 0.01);
        this.enemies[i].y -= (this.enemies[i].y - this.player.y) / Math.max(scale, 0.01);
      }
    }
    if (this.lastNewAI + this.config.respawn < currTime &&
      this.enemies.length < this.config.maxEnemy) {
      let safe = 5;
      // new enemy
      let x = Math.floor((Math.random() * this.width));
      let y = Math.floor((Math.random() * this.height));

      while ((this.player.x + this.playerIcon.width + safe) > x &&
        (this.x + this.enemyIcon.width + safe) > this.player.x &&
        (this.player.y + this.playerIcon.height + safe) > y &&
        (this.y + this.enemyIcon.height + safe) > this.player.y
        ) {
        x = Math.floor((Math.random() * this.width));
        y = Math.floor((Math.random() * this.height));
      }
      this.enemies.push({
        x: x,
        y: y,
        type: 0,
        HP: this.config.enemyHP
      });
      this.lastNewAI = currTime;
    }
  }

  conflict(x, y, img, x_other, y_other, img_other) {
    return ((x + img.width > x_other) &&
      (x_other + img_other.width > x) &&
      (y + img.width > y_other) &&
      (y_other + img_other.width > y))
  }

  handleHits() {
    let currTime = + new Date();
    for (let i=this.enemies.length-1;i>=0;i--) {
      if (this.player.invincible + this.config.invincible < currTime &&
        this.conflict(this.player.x, this.player.y, this.playerIcon,
          this.enemies[i].x, this.enemies[i].y, this.enemyIcon)) {
        this.player.invincible = currTime;
        this.player.HP -= this.config.hpLoss;
        if (this.player.HP < 0) {
          this.player.HP = 0;
        }
        this.enemies.splice(i, 1);
      } else {
        for (let j=this.shots.length-1;j>=0;j--) {
          if (this.conflict(this.shots[j].x, this.shots[j].y, this.projectileIcon,
            this.enemies[i].x, this.enemies[i].y, this.enemyIcon)) {
            this.enemies[i].HP -= 1;
            this.shots.splice(j, 1);
            if (this.enemies[i].HP <= 0) {
              this.enemies.splice(i, 1);
              this.score += 1;
              break;
            }
          }
        }
      }
    }
    return false;
  }

  getCanvas(): any {
    return this.canvas || this.shooterRef.nativeElement;
    }

  draw() {
    let position = this.canvas.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    this.x = position.x - scrollTop;
    this.y = position.y - scrollLeft;
    this.movePlayer();
    this.fireShots();
    this.handleAI();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.handleHits();
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Arial";
    this.ctx.fillText(`HP: ${this.player.HP}`, 5, 40);
    this.ctx.fillText(`Score: ${this.score}`, 5, 80);
    for (let i=0;i<this.enemies.length;i++) {
      this.ctx.drawImage(this.enemyIcon, this.enemies[i].x, this.enemies[i].y);
    }
    for (let i=0;i<this.shots.length;i++) {
      this.ctx.drawImage(this.projectileIcon, this.shots[i].x, this.shots[i].y);
    }
    this.ctx.drawImage(this.playerIcon, this.player.x, this.player.y);
    if (this.player.HP<=0) {
      this.ctx.fillStyle = "red";
      this.ctx.font = "40px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(`Score: ${this.score}`, this.width/2, this.height/2);
      return;
    }
    if (this.pause) {
      return;
    }
    requestAnimationFrame(() => this.draw());
  }
  pauseGame() {
    this.pause = true;
  }

  start() {
    var shooter = this;
    document.addEventListener('keypress', function(e) {
      var code = e.keyCode || e.which;
      if (code == shooter.KEYS.UP && shooter.player.y_change >= 0) {
        shooter.player.y_change = -1;
      } else if (code == shooter.KEYS.RIGHT && shooter.player.x_change <= 0) {
        shooter.player.x_change = 1;
      } else if (code == shooter.KEYS.DOWN && shooter.player.y_change <= 0) {
        shooter.player.y_change = 1;
      } else if (code == shooter.KEYS.LEFT && shooter.player.x_change >= 0) {
        shooter.player.x_change = -1;
      }
    });

    document.addEventListener('keyup', function(e) {
      var code = e.keyCode || e.which;
      if (code == shooter.KEY_DOWN.UP && shooter.player.y_change < 0) {
        shooter.player.y_change = 0;
      } else if (code == shooter.KEY_DOWN.RIGHT && shooter.player.x_change > 0) {
        shooter.player.x_change = 0;
      } else if (code == shooter.KEY_DOWN.DOWN && shooter.player.y_change > 0) {
        shooter.player.y_change = 0;
      } else if (code == shooter.KEY_DOWN.LEFT && shooter.player.x_change < 0) {
        shooter.player.x_change = 0;
      }
    });
    document.addEventListener('mousedown', function(e) {
      shooter.player.shoot = {
        x: e.pageX,
        y: e.pageY
      };
    });
  }

  ngOnInit() {
    var loadedImages = 0;
    this.playerIcon.src = this.playerIconSrc;
    this.projectileIcon.src = this.projectileIconSrc;
    this.enemyIcon.src = this.enemyIconSrc;
    this.canvas = this.shooterRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.enemies = [];
    this.player = {
      x: 200,
      y: 300,
      x_change: 0,
      y_change: 0,
      shoot: undefined,
      HP: this.config.playerHP,
      invincible: +new Date()
    };
    this.shots = [];
    let position = this.canvas.getBoundingClientRect();
    this.x = position.x;
    this.y = position.y;
    this.lastNewAI = +new Date();
    var cb = () => {
      loadedImages += 1;
      if (loadedImages === 3) {
        this.start();
        requestAnimationFrame(() => this.draw());
      }
    }
    this.playerIcon.onload = cb;
    this.projectileIcon.onload = cb;
    this.enemyIcon.onload = cb;
  }
}

export interface Player {
  x?: number;
  y?: number;
  x_change: number;
  y_change: number;
  invincible: number;
  HP?: number;
  shoot: {
    x?: number,
    y?: number
  };
}

export interface Enemy {
  x?: number;
  y?: number;
  type?: number;
  HP?: number;
}

export interface Projectile {
  x?: number;
  y?: number;
  x_change: number;
  y_change: number;
}
