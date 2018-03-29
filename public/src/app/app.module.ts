import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';
import { GameModule } from './games/game.module';
import { CommonModule } from './common/common.module';

import { APIService } from './services/api.service';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    RoutingModule,
    GameModule,
    CommonModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
