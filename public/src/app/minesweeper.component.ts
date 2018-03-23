import { Component, Input } from '@angular/core';
import { APIRoutingService } from './services/api-routing.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent {
  board = [];
  gameStatus = 0;
  revealCount = 0;
  isSpectating;

  @Input() row: 0;
  @Input() col: 0;
  @Input() mines: 0;
  @Input() gameId: '';

  icons = {
    'flag': 'flag',
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

  constructor(private _api: APIRoutingService, private _socket: SocketService) {

  }

  createBoard(initBoard) {
    this.gameStatus = 0;
    this.revealCount = 0

    var boardConfig;
    if (!initBoard) {
      var tempGameState = [];
      for (var i = 0; i < this.row * this.col; i++) {
        tempGameState.push({status: 0, number: 0});
      }
      boardConfig = {
        m: this.row,
        n: this.col,
        mines: this.mines,
        gameState: tempGameState,
      };
      this.isSpectating = false;
    } else {
      boardConfig = initBoard;
      this.row = initBoard.m;
      this.col = initBoard.m;
      this.mines = initBoard.mines;
      for (var i = 0; i < initBoard.gameState.length; i++) {
        if (initBoard.gameState[i].status == 1) this.revealCount++;
      }
      this.isSpectating = true;
    }

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
        var display;
        if (nextState.status == 0) {
          display = this.icons[0];
        } else if (nextState.status == 1) {
          display = this.icons[nextState.number];
        } else if (nextState.status == 2) {
          display = this.icons['flag'];
        }
        var newState = {status: nextState.status, number: nextState.number, x: j, y: i, display: display};
        this.board[j].push(newState);
      }
    }

    if (this.isSpectating) {
      this._socket.newMove(res => {
        this.processMoves(res);
      });
    }
  }

  click($event, isRightClick) {
    if (this.isSpectating) return;

    var rowCol = ($event.target.id || $event.target.parentNode.id).split('-');
    var x = rowCol[0];
    var y = rowCol[1];
    if ((!isRightClick && this.board[x][y].status != 0) || (isRightClick && this.board[x][y].status == 1)) return;
    this._api.post('/api/games/minesweeper/' + this.gameId, {
      'n': this.row,
      'm': this.col,
      'mines': this.mines,
      'x': x - 0,
      'y': y - 0,
      'move': isRightClick - 0,
    }).subscribe((res) => {
      this.processMoves(res);
    });
  }

  processMoves(res) {
    this.gameStatus = res.status;
    var moves = res.moves;
    for (var i = 0; i < moves.length; i++) {
      var nextMove = moves[i];
      this.board[nextMove.n][nextMove.m].status = nextMove.type;
      this.board[nextMove.n][nextMove.m].number = nextMove.number;
      if (nextMove.type == 1) this.revealCount++;
    }
    this.updateDisplay();
  }

  disableContextMenu($event) {
    $event.preventDefault();
  }

  updateDisplay() {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        var nextState = this.board[i][j];
        var display;
        if (nextState.status == 0) {
          display = this.icons[0];
        } else if (nextState.status == 1) {
          display = this.icons[nextState.number];
        } else if (nextState.status == 2) {
          display = this.icons['flag'];
        }
        this.board[i][j].display = display;
      }
    }
  }

  getCellClasses() {
    let classes = {
      failed: this.gameStatus == 1,
      winned: this.revealCount >= this.row * this.col - this.mines,
    };
    return classes;
  }
}
