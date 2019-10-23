import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverListComponent} from './forms/driver-list/driver-list.component';
import {AddDriverComponent} from './forms/add-driver/add-driver.component';

const routes: Routes = [
  {path: 'drivers', component: DriverListComponent},
  {path: 'add_driver', component: AddDriverComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
