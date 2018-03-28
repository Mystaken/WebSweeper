import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { APIService } from '../services/api.service';
import { UserService } from '../services/user.service';

import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    UserCardComponent
  ],
  providers: [
    UserService,
    APIService
  ]
})

export class UserModule { }
