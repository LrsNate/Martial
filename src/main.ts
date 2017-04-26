import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app',
  template: `<p>Hi!</p>`
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
