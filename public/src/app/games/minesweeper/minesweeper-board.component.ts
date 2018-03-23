import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './minesweeper-board.component.html',
  styleUrls: ['./minesweeper-board.component.css']
})
export class MinesweeperBoardComponent {

  /* number of columns in the game */
  private _n: number;

  /* number of rows in the game */
  private _m: number;

  /* number of mines in the game */
  private _mines: number;

  /* the board to be displayed  Array[row][column]*/
  private _board: Array<Array<MineCell>> = [];

  /* number of mines revealed */
  private _revealed: number;

  @Input()
  set columns(columns: number) {
    this._m = columns;
    this.resetBoard();
  }

  @Input()
  set rows(rows: number) {
    this._n = rows;
    this.resetBoard();
  }

  @Input()
  set mines(mines: number) {
    this._mines = mines;
    this.resetBoard();
  }

  @Input()
  active: boolean;

  @Output() flagged = new EventEmitter();
  @Output() revealed = new EventEmitter();

  resetBoard(): void {
    this._board = new Array(this._m).fill(
      new Array(this._n).fill({
          status: 0,
          display: ' '
        }));
  }

  disableContextMenu($event): void {
    $event.preventDefault();
  }

  flag(row:number, column:number): void {
    this._board[row][column].status = 2;
  }

  reveal(row:number, column:number, display:String): void {
    this._board[row][column].display = display;
  }

  _reveal(row:number, column:number):void {
    this.revealed.emit({
      row:row,
      column:column
    });
  }

  _flag(row:number, column:number):void {
    this.flagged.emit({
      row:row,
      column: column
    });
  }

  constructor() {
    this.resetBoard();
  }

  ngOnInit() {
  }
}

interface MineCell {
  status?: number;  // 0 = unflagged, 1 = shown, 2 = Flagged
  display?: String;
}
