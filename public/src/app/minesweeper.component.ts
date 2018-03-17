import { Component } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent {
  board = [];
  negOne = -1;
  icons = {
    '-1': 'flag',
    0: '　',
    1: '１',
    2: '２',
    3: '３',
    4: '４',
    5: '５',
    6: '６',
    7: '７',
    8: '８',
    9: '９',
  };

  constructor(private _api: APIRoutingService) {
    var boardConfig = { n: 5,
      m: 5,
      mines: 10,
      gameState:
       [ { status: 0, number: 2 },
         { status: 0, number: 3 },
         { status: 0, number: 2 },
         { status: 0, number: 2 },
         { status: 0, number: -1 },
         { status: 0, number: -1 },
         { status: 0, number: -1 },
         { status: 0, number: -1 },
         { status: 0, number: 4 },
         { status: 0, number: 2 },
         { status: 0, number: 3 },
         { status: 0, number: -1 },
         { status: 0, number: -1 },
         { status: 0, number: 5 },
         { status: 0, number: -1 },
         { status: 0, number: 2 },
         { status: 0, number: 4 },
         { status: 0, number: -1 },
         { status: 0, number: 4 },
         { status: 0, number: -1 },
         { status: 0, number: 1 },
         { status: 0, number: -1 },
         { status: 0, number: 2 },
         { status: 0, number: 2 },
         { status: 0, number: 1 } ] };

    var m = boardConfig.m;
    var n = boardConfig.n;
    var gameState = boardConfig.gameState;
    this.board = [];
    for (var i = 0; i < m; i++) {
      this.board.push([]);
    }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        var nextState = gameState[i * m + j];
        var newState = {status: nextState.status, number: nextState.number, x: j, y: i};
        this.board[j].push(newState);
      }
    }

    console.log(this.board);
  }

  click($event) {
    console.log('click: ', $event.target.id || $event.target.parentNode.id);
  }

  rightClick($event) {
    $event.preventDefault();
    console.log('click: ', $event.target.id || $event.target.parentNode.id);
  }

  disableContextMenu($event) {
    $event.preventDefault();
  }
}
