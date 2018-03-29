import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './users/login.component';
import { LobbyComponent } from './games/lobby.component';
import { GameComponent } from './games/game.component';
import { InvalidLinkComponent } from './common/invalid-link.component';
import { CreditsComponent } from './common/credits.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },{
    path: 'games/:id',
    pathMatch: 'full',
    component: GameComponent,
    canActivate: [ AuthGuard ]
  },{
    path: 'lobby',
    pathMatch: 'full',
    component: LobbyComponent,
    canActivate: [ AuthGuard ]
  },{
    path: 'credits',
    pathMatch: 'full',
    component: CreditsComponent
  },{
    path: '**',
    component: InvalidLinkComponent
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
