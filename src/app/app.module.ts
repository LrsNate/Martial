import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdGridListModule, MdListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import AppComponent from './app.component';
import '../style/material-theme';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdGridListModule,
    MdListModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export default class AppModule {}
