import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DriverService} from './services/driver-service.service';
import {DriverListComponent} from './forms/driver-list/driver-list.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialAppModule} from './ngmaterial.module';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialAppModule
  ],
  providers: [DriverService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
