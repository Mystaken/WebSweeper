import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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