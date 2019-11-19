import {Component, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../models/driver';
import {DriverService} from '../../services/driver.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {

  drivers: Driver[];
  displayedColumns: string[] = ['id', 'name', 'driverLicense', 'contact' , 'status'];
  subscription: Subscription;

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.subscription = this.driverService.findAll().subscribe((data: Driver[]) => {
      this.drivers = data;
      console.log(this.drivers);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
