import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverListComponent} from './forms/list-components/driver-list/driver-list.component';
import {AddDriverComponent} from './forms/add-components/add-driver/add-driver.component';
import {TruckListComponent} from './forms/list-components/truck-list/truck-list.component';
import {AddTruckComponent} from './forms/add-components/add-truck/add-truck.component';
import {UpdateDriverComponent} from './forms/update-components/update-driver/update-driver.component';
import {OrderListComponent} from './forms/list-components/order-list/order-list.component';
import {HomepageComponent} from './forms/core-components/homepage/homepage.component';
import {NotFoundComponent} from './forms/core-components/not-found/not-found.component';
import {ManagersListComponent} from './forms/list-components/managers-list/managers-list.component';
import {AddManagerComponent} from './forms/add-components/add-manager/add-manager.component';
import {UpdateManagerComponent} from './forms/update-components/update-manager/update-manager.component';
import {UpdateTruckComponent} from './forms/update-components/update-truck/update-truck.component';
import {LoginComponent} from './forms/auth/login/login.component';
import {AddCargoComponent} from './forms/add-components/add-order/add-order.component';
import {AdminGuard} from './forms/auth/guards/admin.guard';
import {AdminDriverGuard} from './forms/auth/guards/admin-driver.guard';
import {AddCityComponent} from './forms/add-components/add-city/add-city.component';
import {UpdateOrderComponent} from './forms/update-components/update-order/update-order.component';

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
  {path: 'update-order', component: UpdateOrderComponent, canActivate: [AdminGuard]},
  {path: 'order', component: OrderListComponent, canActivate: [AdminGuard]},
  {path: 'add-city', component: AddCityComponent, canActivate: [AdminGuard]},
  {path: 'add-order', component: AddCargoComponent, canActivate: [AdminGuard]},
  {path: 'homepage', component: HomepageComponent, canActivate: [AdminDriverGuard]},
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
