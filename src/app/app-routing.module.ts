import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverListComponent} from './forms/driver-list/driver-list.component';
import {AddDriverComponent} from './forms/add-driver/add-driver.component';
import {TruckListComponent} from './forms/truck-list/truck-list.component';
import {AddTruckComponent} from './forms/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-driver/update-driver.component';
import {CargoListComponent} from './forms/cargo-list/cargo-list.component';

const routes: Routes = [
  {path: 'drivers', component: DriverListComponent},
  {path: 'add_driver', component: AddDriverComponent},
  {path: 'trucks', component: TruckListComponent},
  {path: 'add_truck', component: AddTruckComponent},
  {path: 'update_driver', component: UpdateDriverComponent},
  {path: 'cargo', component: CargoListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
