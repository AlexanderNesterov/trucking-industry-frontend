import {Component, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../services/driver.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {OrderService} from '../../../services/order.service';

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

  canBlock = false;

  constructor(private driverService: DriverService, private router: Router,
              private bottomSheet: MatBottomSheet, private userService: UserService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.getDrivers();
  }

  updateDriver(driverId: number) {
    this.router.navigate([`/update-driver`], {queryParams: {id: driverId}});
  }

  blockAccount(userId: number, driverId: number) {
    this.userService.blockDriverAccount(userId, driverId).subscribe(res => {
      this.getDrivers();
      this.canBlock = false;
    });
  }

  unlockAccount(userId: number) {
    this.userService.unlockAccount(userId).subscribe(res => {
      this.getDrivers();
      this.canBlock = false;
    });
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

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  checkToBlock(id: number, status: string) {
    this.orderService.checkOrderToBlockDriver(id).subscribe(res => {
      if (res && status === 'ACTIVE') {
        this.canBlock = true;
      }
    });
  }
}
