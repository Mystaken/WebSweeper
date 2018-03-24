import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MinesweeperService } from './minesweeper.service';
@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent {

  @Input()
  rows: number;

  @Input()
  columns: number;

  @Input()
  mines: number;

  active = true;

  constructor(_minesweeperAPI: MinesweeperService) {}

  test(e) {

  }
}