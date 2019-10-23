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
import {AddDriverComponent} from './forms/add-driver/add-driver.component';
import {TruckListComponent} from './forms/truck-list/truck-list.component';
import {TruckService} from './services/truck-service.service';
import {AddTruckComponent} from './forms/add-truck/add-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    AddDriverComponent,
    TruckListComponent,
    AddTruckComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialAppModule
  ],
  providers: [DriverService, TruckService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
