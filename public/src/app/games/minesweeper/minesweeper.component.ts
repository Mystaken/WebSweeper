import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperBoardComponent } from './minesweeper-board.component';
@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent {
  @Input()
  id: string;
  @ViewChild('ms') ms: MinesweeperBoardComponent;

  rows: number = 0;
  columns: number = 0;
  mines: number = 0;
  active: boolean = true;

  constructor(
    private _minesweeperAPI: MinesweeperService,
    private _ref: ChangeDetectorRef) {}

  ngOnInit() {
    this._minesweeperAPI.getBoard(this.id).subscribe(res => {
      this.rows = res.game.n;
      this.columns = res.game.m;
      this.mines = res.game.mines;
      this._ref.detectChanges();
      if (res.game.gameState) {
        this.setup(res.game.gameState);
      }
    })
  }

  setup(gameState) {
    for (let i=0;i<gameState.length;i++) {
      let n = i % this.rows;
      let m = Math.floor(i / this.rows);
      if (gameState[i].status == 1) {
        this.ms.reveal(m, n, gameState[i].number.toString());
      } else if (gameState[i].status === 2) {
        this.ms.flag(m, n);
      }
    }
  }

  onRevealed(cell) {
    this._minesweeperAPI
      .reveal(this.id, cell.row, cell.column)
      .subscribe((res) => {
        res.moves.forEach(function(move) {
          this.ms.reveal(move.m, move.n, move.number.toString());
        }, this);
      });
  }


  onFlagged(cell) {
    this._minesweeperAPI
      .flag(this.id, cell.row, cell.column)
      .subscribe((res) => {
        if (res.moves.length) {
          this.ms.flag(cell.row, cell.column);
        }
      });
  }
}