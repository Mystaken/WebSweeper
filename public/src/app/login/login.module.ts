import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { APIService } from '../services/api.service';
import { LoginService } from './login.service';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService,
    APIService
  ]
})

export class LoginModule { }
