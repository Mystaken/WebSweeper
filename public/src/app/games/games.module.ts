import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MinesweeperBoardComponent } from './minesweeper/minesweeper-board.component';


@NgModule({
  declarations: [
    MinesweeperBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MinesweeperBoardComponent
  ],
  providers: [
  ]
})

export class GamesModule { }