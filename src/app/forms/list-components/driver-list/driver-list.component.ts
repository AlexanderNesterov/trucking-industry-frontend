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

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.findAllDrivers();
  }

  findAllDrivers() {
    this.subscription = this.driverService.findAll().subscribe((data: Driver[]) => {
      this.drivers = data;
    });
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
