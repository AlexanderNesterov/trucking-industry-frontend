import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DriverService} from './services/driver.service';
import {DriverListComponent} from './forms/list-components/driver-list/driver-list.component';
import {GuardsCheckEnd, Router, RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialAppModule} from './ngmaterial.module';
import {AddDriverComponent} from './forms/add-components/add-driver/add-driver.component';
import {TruckListComponent} from './forms/list-components/truck-list/truck-list.component';
import {TruckService} from './services/truck.service';
import {AddTruckComponent} from './forms/add-components/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-components/update-driver/update-driver.component';
import {OrderService} from './services/order.service';
import {CargoListComponent} from './forms/list-components/cargo-list/cargo-list.component';
import {CargoDetailDialogComponent} from './forms/core-components/dialogs/cargo-detail-dialog/cargo-detail-dialog.component';
import {MatSortModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HomepageComponent} from './forms/core-components/homepage/homepage.component';
import {Interceptor} from './interceptors/interceptor';
import {NotFoundComponent} from './forms/core-components/not-found/not-found.component';
import {ManagersListComponent} from './forms/list-components/managers-list/managers-list.component';
import {ManagerService} from './services/manager.service';
import {AddManagerComponent} from './forms/add-components/add-manager/add-manager.component';
import {UpdateManagerComponent} from './forms/update-components/update-manager/update-manager.component';
import {UpdateTruckComponent} from './forms/update-components/update-truck/update-truck.component';
import {UpdateCargoComponent} from './forms/update-components/update-cargo/update-cargo.component';
import {HeaderComponent} from './forms/core-components/header/header.component';
import {BodyComponent} from './forms/core-components/body/body.component';
import {FooterComponent} from './forms/core-components/footer/footer.component';
import {ConfirmationDialogComponent} from './forms/core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {SpinnerComponent} from './forms/core-components/spinner/spinner.component';
import {LoginComponent} from './forms/auth/login/login.component';
import {AddCargoComponent} from './forms/add-components/add-order/add-order.component';
import {TruckInfoComponent} from './forms/add-components/add-order/truck-info/truck-info.component';
import {DriversInfoComponent} from './forms/add-components/add-order/drivers-info/drivers-info.component';
import {LoginService} from './services/login.service';
import {PermissionService} from './services/permision.service';
import {filter, map} from 'rxjs/operators';
import {CargoListInfoComponent} from './forms/add-components/add-order/cargo-list-info/cargo-list-info.component';
import {AgmCoreModule} from '@agm/core';
import {CargoDialogInfoComponent} from './forms/add-components/add-order/cargo-dialog-info/cargo-dialog-info.component';
import {CargoInfoComponent} from './forms/add-components/add-order/cargo-info/cargo-info.component';
import {FilledOrderComponent} from './forms/add-components/add-order/filled-order/filled-order.component';

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : 'AIzaSyC1dshp0VINWJKfg3dM9RWDxkF5i6_iTNs',
});

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
    HomepageComponent,
    NotFoundComponent,
    ManagersListComponent,
    AddManagerComponent,
    UpdateManagerComponent,
    UpdateTruckComponent,
    UpdateCargoComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    SpinnerComponent,
    LoginComponent,
    TruckInfoComponent,
    DriversInfoComponent,
    CargoListInfoComponent,
    CargoDialogInfoComponent,
    CargoInfoComponent,
    FilledOrderComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialAppModule,
    MatSortModule,
    FormsModule,
    BrowserAnimationsModule,
    googleMapsCore
  ],
  providers: [
    DriverService,
    TruckService,
    OrderService,
    ManagerService,
    LoginService,
    PermissionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  entryComponents: [CargoDetailDialogComponent, ConfirmationDialogComponent, CargoDialogInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof GuardsCheckEnd),
      map(event => (event as GuardsCheckEnd).shouldActivate)
    ).subscribe(shouldActivate => {
      if (!shouldActivate) {
        this.router.navigate(['/login']);
      }
    });
  }
}
