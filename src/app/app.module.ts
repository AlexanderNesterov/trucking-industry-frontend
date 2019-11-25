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
import {CargoService} from './services/cargo.service';
import {CargoListComponent} from './forms/list-components/cargo-list/cargo-list.component';
import {CargoDetailDialogComponent} from './forms/core-components/cargo-detail-dialog/cargo-detail-dialog.component';
import {MatSortModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DriverInfoComponent} from './forms/core-components/driver-info/driver-info.component';
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
import {ConfirmationDialogComponent} from './forms/core-components/confirmation-dialog/confirmation-dialog.component';
import {SpinnerComponent} from './forms/core-components/spinner/spinner.component';
import {LoginComponent} from './forms/auth/login/login.component';
import {CargoInfoComponent} from './forms/add-components/cargo-info/cargo-info.component';
import {AddCargoComponent} from './forms/add-components/add-cargo/add-cargo-three.component';
import {TruckInfoComponent} from './forms/add-components/truck-info/truck-info.component';
import {DriversInfoComponent} from './forms/add-components/drivers-info/drivers-info.component';
import {LoginService} from './services/login.service';
import {PermissionService} from './services/permision.service';
import {filter, map} from 'rxjs/operators';

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
    UpdateManagerComponent,
    UpdateTruckComponent,
    UpdateCargoComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    SpinnerComponent,
    LoginComponent,
    CargoInfoComponent,
    TruckInfoComponent,
    DriversInfoComponent
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
  ],
  providers: [
    DriverService,
    TruckService,
    CargoService,
    ManagerService,
    LoginService,
    PermissionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  entryComponents: [CargoDetailDialogComponent, ConfirmationDialogComponent],
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
