import {Component, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../services/driver.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {

  drivers: Driver[];
  displayedColumns: string[] = ['id', 'name', 'driverLicense', 'contact', 'status', 'action'];
  subscription: Subscription;

  filterControl = new FormControl();
  filterGroup = new FormGroup({
    filter: this.filterControl
  });

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.searchDrivers();
    this.findAllDrivers();
  }

  findAllDrivers() {
    this.subscription = this.driverService.findAll().subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }

  searchDrivers() {
    this.filterControl.valueChanges.pipe(
      debounceTime(1500),
      switchMap(text => {
        this.drivers = undefined;

        if (text !== '') {
          return this.driverService.getDriversBySearch((text as string).toLowerCase());
        }

        return this.driverService.findAll();
      })
    ).subscribe(res => {
      this.drivers = res;
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
