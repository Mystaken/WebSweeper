import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './minesweeper-board.component.html',
  styleUrls: ['./minesweeper-board.component.css']
})
export class MinesweeperBoardComponent {

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

  @Output() onFlag = new EventEmitter();
  @Output() onRevealed = new EventEmitter();

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

  /* true iff this game is lost */
  private _lose: boolean;

  constructor() {
    this.resetBoard();
  }

  getBoard(): Array<Array<MineCell>> {
    return this._board;
  }

  resetBoard(): void {
    this._board = new Array(this._n).fill(
      new Array(this._m).fill({
          status: 0,
          display: ' '
        }));
    this._revealed = 0;
    this._lose = false;
  }

  private _reveal(row:number, column:number):void {
    this.onRevealed.emit({
      row:row,
      column:column
    });
  }

  private _flag(row:number, column:number):void {
    this.onFlag.emit({
      row:row,
      column: column
    });
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

  lose():void {
    this._lose = true;
  }

  hasLoss(): boolean {
    return this._lose;
  }

  hasWon(): boolean {
    return (this._n * this._m - this._revealed) === this._mines;
  }
}

interface MineCell {
  status?: number;  // 0 = unflagged, 1 = shown, 2 = Flagged
  display?: String;
}
