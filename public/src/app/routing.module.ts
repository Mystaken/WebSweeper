import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { GameComponent } from './game.component';
import { MinesweeperComponent } from './minesweeper.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'game',
    pathMatch: 'full',
    component: GameComponent,
  },
  {
    path: 'minesweeper',
    pathMatch: 'full',
    component: MinesweeperComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class RoutingModule { }
