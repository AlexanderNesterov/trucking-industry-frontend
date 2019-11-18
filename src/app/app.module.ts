import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DriverService} from './services/driver.service';
import {DriverListComponent} from './forms/driver-list/driver-list.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialAppModule} from './ngmaterial.module';
import {AddDriverComponent} from './forms/add-driver/add-driver.component';
import {TruckListComponent} from './forms/truck-list/truck-list.component';
import {TruckService} from './services/truck.service';
import {AddTruckComponent} from './forms/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-driver/update-driver.component';
import {CargoService} from './services/cargo.service';
import {CargoListComponent} from './forms/cargo-list/cargo-list.component';
import {CargoDetailDialogComponent} from './forms/cargo-detail-dialog/cargo-detail-dialog.component';
import {AddCargoComponent} from './forms/add-cargo/add-cargo.component';
import {MatSortModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DriverInfoComponent} from './forms/driver-info/driver-info.component';
import {Interceptor} from './interceptors/interceptor';
import {NotFoundComponent} from './forms/not-found/not-found.component';
import {ManagersListComponent} from './forms/managers-list/managers-list.component';
import {ManagerService} from './services/manager.service';
import {AddManagerComponent} from './forms/add-manager/add-manager.component';
import {UpdateManagerComponent} from './forms/update-manager/update-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    AddDriverComponent,
    TruckListComponent,
    AddTruckComponent,
    UpdateDriverComponent,
    CargoListComponent,
    CargoDetailDialogComponent,
    AddCargoComponent,
    DriverInfoComponent,
    NotFoundComponent,
    ManagersListComponent,
    AddManagerComponent,
    UpdateManagerComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialAppModule,
    MatSortModule,
    FormsModule
  ],
  providers: [
    DriverService,
    TruckService,
    CargoService,
    ManagerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  entryComponents: [CargoDetailDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
