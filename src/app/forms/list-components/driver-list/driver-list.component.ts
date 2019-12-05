import {Component, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../services/driver.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {

  drivers: Driver[];
  displayedColumns: string[] = ['id', 'name', 'driverLicense', 'contact', 'status', 'action'];
  subscription: Subscription;
  page = 1;
  size = 10;
  textSearch = '';

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.subscription = this.driverService.getDrivers(this.textSearch, this.page, this.size).subscribe(res => {
      this.drivers = res;
    });
  }

  doSearch(text: string) {
    this.drivers = undefined;
    this.textSearch = text;
    this.page = 1;

    this.getDrivers();
  }

  pageChange(page: number) {
    this.page = page;
    this.getDrivers();
  }

  sizeChange(size: number) {
    this.size = size;
    this.getDrivers();
  }

  addNewDriver() {
    this.router.navigate(['/add-driver']);
  }

  updateDriver(id: number) {
    this.router.navigate([`/update-driver`], {queryParams: {id}});
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
