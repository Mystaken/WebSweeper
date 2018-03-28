import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';
import { GameModule } from './games/game.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';

import { APIService } from './services/api.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    RoutingModule,
    GameModule,
    LoginModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
