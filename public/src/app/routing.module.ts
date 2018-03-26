import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './games/lobby.component';
import { GameComponent } from './games/game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }, {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  }, {
    path: 'games/:id',
    pathMatch: 'full',
    component: GameComponent,
  }, {
    path: 'lobby',
    pathMatch: 'full',
    component: LobbyComponent,
  }
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
