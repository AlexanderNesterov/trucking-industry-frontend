import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverListComponent} from './forms/driver-list/driver-list.component';
import {AddDriverComponent} from './forms/add-driver/add-driver.component';
import {TruckListComponent} from './forms/truck-list/truck-list.component';
import {AddTruckComponent} from './forms/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-driver/update-driver.component';
import {CargoListComponent} from './forms/cargo-list/cargo-list.component';
import {AddCargoComponent} from './forms/add-cargo/add-cargo.component';
import {DriverInfoComponent} from './forms/driver-info/driver-info.component';
import {NotFoundComponent} from './forms/not-found/not-found.component';
import {AppComponent} from './app.component';
import {ManagersListComponent} from './forms/managers-list/managers-list.component';
import {AddManagerComponent} from './forms/add-manager/add-manager.component';
import {UpdateManagerComponent} from './forms/update-manager/update-manager.component';
import {UpdateTruckComponent} from './forms/update-truck/update-truck.component';
import {UpdateCargoComponent} from './forms/update-cargo/update-cargo.component';

export const routes: Routes = [
  {path: 'drivers', component: DriverListComponent},
  {path: 'managers', component: ManagersListComponent},
  {path: 'add-driver', component: AddDriverComponent},
  {path: 'add-manager', component: AddManagerComponent},
  {path: 'trucks', component: TruckListComponent},
  {path: 'add-truck', component: AddTruckComponent},
  {path: 'update-driver', component: UpdateDriverComponent},
  {path: 'update-manager', component: UpdateManagerComponent},
  {path: 'update-truck', component: UpdateTruckComponent},
  {path: 'update-cargo', component: UpdateCargoComponent},
  {path: 'cargo', component: CargoListComponent},
  {path: 'add-cargo', component: AddCargoComponent},
  {path: 'driver-info', component: DriverInfoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
