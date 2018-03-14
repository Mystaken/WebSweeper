import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
