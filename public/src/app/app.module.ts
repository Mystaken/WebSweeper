import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { GameComponent } from './game.component';
import { MinesweeperComponent } from './minesweeper.component';
import { ChatComponent } from './chat.component';

import { APIRoutingService } from './services/api-routing.service';
import { SocketService } from './services/socket.service';

const config: SocketIoConfig = { url: '', options: {path: '/socket'} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    MinesweeperComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    APIRoutingService,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
