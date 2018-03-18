import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { GameComponent } from './game.component';
import { MinesweeperComponent } from './minesweeper.component';
import { ChatComponent } from './chat.component';

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
    path: 'chat',
    pathMatch: 'full',
    component: ChatComponent,
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
