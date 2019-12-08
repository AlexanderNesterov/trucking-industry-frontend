import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {DriverService} from '../../../../services/driver.service';
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
  firstDriver: Driver;
  coDriver: Driver;

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

  @Input()
  set getDrivers(start: boolean) {
    if (start === undefined) {
      return;
    }

    this.driverSubscription = this.driverService.getFreeDrivers().subscribe(data => {
      this.drivers = new MatTableDataSource(data);
    });
  }

  next() {
    const drivers = [this.firstDriver, this.coDriver];
    this.onValidThirdGroup.emit(drivers);
  }

  selectFirstDriver(driver: Driver) {
    if (driver === this.coDriver) {
      const controlValue = this.driversFormControl.value;
      this.driversFormControl.patchValue(controlValue - 1);
      this.coDriver = undefined;
      this.firstDriver = driver;
      return;
    }

    if (this.firstDriver === undefined) {
      const controlValue = this.driversFormControl.value;
      this.driversFormControl.patchValue(controlValue + 1);
    }

    this.firstDriver = driver;
  }

  selectCoDriver(driver: Driver) {
    if (driver === this.firstDriver) {
      const controlValue = this.driversFormControl.value;
      this.driversFormControl.patchValue(controlValue - 1);
      this.firstDriver = undefined;
      this.coDriver = driver;
      return;
    }

    if (this.coDriver === undefined) {
      const controlValue = this.driversFormControl.value;
      this.driversFormControl.patchValue(controlValue + 1);
    }

    this.coDriver = driver;
  }

  deleteFirstDriver() {
    const controlValue = this.driversFormControl.value;
    this.driversFormControl.patchValue(controlValue - 1);
    this.firstDriver = undefined;
  }

  deleteCoDriver() {
    const controlValue = this.driversFormControl.value;
    this.driversFormControl.patchValue(controlValue - 1);
    this.coDriver = undefined;
  }
}
