import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './minesweeper-board.component.html',
  styleUrls: ['./minesweeper-board.component.css']
})
export class MinesweeperBoardComponent {

  @Input()
  set columns(columns: number) {
    this._n = columns;
    this.resetBoard();
  }

  @Input()
  set rows(rows: number) {
    this._m = rows;
    this.resetBoard();
  }

  @Input()
  set mines(mines: number) {
    this._mines = mines;
    this.resetBoard();
  }

  @Input()
  active: boolean;

  @Output() onFlagged = new EventEmitter();
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
    this._board = [];
    for (let i=0; i<this._n; i++) {
      let row = [];
      for (let j=0; j<this._m;j++) {
        row.push({
          status: 0,
          display: '　'
        });
      }
      this._board.push(row);
    }
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
    this.onFlagged.emit({
      row:row,
      column: column
    });
  }

  icons = {
    flag: 'flag',
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
  }

  disableContextMenu($event): void {
    $event.preventDefault();
  }

  flag(row:number, column:number): void {
    let cell = this._board[row][column];
    cell.status = 2;
    cell.display = this.icons.flag;
  }

  unflag(row:number, column:number): void {
    let cell = this._board[row][column];
    cell.status = 0;
    cell.display = '　';
  }

  reveal(row:number, column:number, display:string): void {
    let cell = this._board[row][column];
    cell.display = this.icons[display];
    this._revealed += 1;
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

  test(): void {
    console.log(this._m, this._n);
  }
}

interface MineCell {
  status?: number;  // 0 = unflagged, 1 = shown, 2 = Flagged
  display?: string;
}
