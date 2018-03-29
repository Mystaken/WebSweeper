import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InvalidLinkComponent } from './invalid-link.component';
import { CreditsComponent } from './credits.component';

@NgModule({
  declarations: [
    InvalidLinkComponent,
    CreditsComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    InvalidLinkComponent,
    CreditsComponent
  ],
  providers: [],
  bootstrap: []
})
export class CommonModule { }
