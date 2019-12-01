import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {DriverService} from '../../../../services/driver.service';
import {Truck} from '../../../../models/truck';
import {Driver} from '../../../../models/driver';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-drivers-info',
  templateUrl: './drivers-info.component.html',
  styleUrls: ['./drivers-info.component.css']
})
export class DriversInfoComponent {

  drivers: MatTableDataSource<Driver>;
  driverSubscription: Subscription;
  driversSelection = new SelectionModel(true);

  driversFormControl = new FormControl(0, [
    Validators.min(2)
  ]);

  thirdFormGroup = new FormGroup({
    driversCtrl: this.driversFormControl
  });

  driverDisplayedColumns: string[] = ['id', 'name', 'driverLicense', 'select'];

  @Output() onValidThirdGroup = new EventEmitter<Driver[]>();

  constructor(private driverService: DriverService) {
  }

  check() {
    this.thirdFormGroup.patchValue({driversCtrl: this.driversSelection.selected.length});
  }

  @Input()
  set getDrivers(start: boolean) {
    if (start === undefined) {
      console.log(start);
      return;
    }

    this.driverSubscription = this.driverService.getFreeDrivers().subscribe(data => {
      this.drivers = new MatTableDataSource(data);
      console.log('Trucks: ', this.drivers);
    });
  }

  next() {
    this.onValidThirdGroup.emit(this.driversSelection.selected);
  }

}
