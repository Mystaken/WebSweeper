import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";

import { APIService } from '../services/api.service';
import { UserService } from './user.service';

import { UserCardComponent } from './user-card.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    UserCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule
  ],
  exports: [
    UserCardComponent,
    LoginComponent
  ],
  providers: [
    UserService,
    APIService
  ]
})

export class UserModule { }
