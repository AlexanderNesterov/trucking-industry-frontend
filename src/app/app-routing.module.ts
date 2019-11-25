import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverListComponent} from './forms/list-components/driver-list/driver-list.component';
import {AddDriverComponent} from './forms/add-components/add-driver/add-driver.component';
import {TruckListComponent} from './forms/list-components/truck-list/truck-list.component';
import {AddTruckComponent} from './forms/add-components/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-components/update-driver/update-driver.component';
import {CargoListComponent} from './forms/list-components/cargo-list/cargo-list.component';
import {DriverInfoComponent} from './forms/core-components/driver-info/driver-info.component';
import {NotFoundComponent} from './forms/core-components/not-found/not-found.component';
import {ManagersListComponent} from './forms/list-components/managers-list/managers-list.component';
import {AddManagerComponent} from './forms/add-components/add-manager/add-manager.component';
import {UpdateManagerComponent} from './forms/update-components/update-manager/update-manager.component';
import {UpdateTruckComponent} from './forms/update-components/update-truck/update-truck.component';
import {UpdateCargoComponent} from './forms/update-components/update-cargo/update-cargo.component';
import {LoginComponent} from './forms/auth/login/login.component';
import {AddCargoComponent} from './forms/add-components/add-cargo/add-cargo-three.component';
import {DriverGuard} from './forms/auth/guards/driver.guard';
import {AdminGuard} from './forms/auth/guards/admin.guard';
import {NoLoggedUserGuard} from './forms/auth/guards/no-logged-user.guard';
import {AdminDriverGuard} from './forms/auth/guards/admin-driver.guard';

export const routes: Routes = [
  {path: 'drivers', component: DriverListComponent, canActivate: [AdminGuard]},
  {path: 'managers', component: ManagersListComponent, canActivate: [AdminGuard]},
  {path: 'add-driver', component: AddDriverComponent, canActivate: [AdminGuard]},
  {path: 'add-manager', component: AddManagerComponent, canActivate: [AdminGuard]},
  {path: 'trucks', component: TruckListComponent, canActivate: [AdminGuard]},
  {path: 'add-truck', component: AddTruckComponent, canActivate: [AdminGuard]},
  {path: 'update-driver', component: UpdateDriverComponent, canActivate: [AdminGuard]},
  {path: 'update-manager', component: UpdateManagerComponent, canActivate: [AdminGuard]},
  {path: 'update-truck', component: UpdateTruckComponent, canActivate: [AdminGuard]},
  {path: 'update-cargo', component: UpdateCargoComponent, canActivate: [AdminGuard]},
  {path: 'cargo', component: CargoListComponent, canActivate: [AdminGuard]},
  {path: 'add-cargo', component: AddCargoComponent, canActivate: [AdminGuard]},
  {path: 'driver-info', component: DriverInfoComponent, canActivate: [AdminDriverGuard]},
  {path: 'login', component: LoginComponent},
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
