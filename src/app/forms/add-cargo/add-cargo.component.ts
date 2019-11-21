import {Component, DoCheck, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';
import {Cargo} from '../../models/cargo';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DriverService} from '../../services/driver.service';
import {CargoService} from '../../services/cargo.service';
import {Subscription} from 'rxjs';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Driver} from '../../models/driver';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo-two.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent implements OnDestroy {

  isCreated = false;
  cargo: Cargo;
  trucks: MatTableDataSource<Truck>;
  drivers: MatTableDataSource<Driver>;
  firstFormDisable = false;
  secondFormDisable = false;
  thirdFormDisable = false;
  isReady = false;
  truckSelection = new SelectionModel<Truck>();
  driversSelection = new SelectionModel(true);
  truckSubscription: Subscription;
  driverSubscription: Subscription;
  cargoSubscription: Subscription;

  truckDisplayedColumns: string[] = ['id', 'model', 'registrationNumber', 'capacity', 'select'];
  driverDisplayedColumns: string[] = ['id', 'name', 'driverLicense', 'select'];

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.max(256)
  ]);

  weightFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);

  truckFormControl = new FormControl('', [
    Validators.requiredTrue
  ]);

  driversFormControl = new FormControl(0, [
    Validators.min(2)
  ]);

  firstFormGroup = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    weight: this.weightFormControl
  });

  secondFormGroup = new FormGroup({
    truck: this.truckFormControl
  });
  thirdFormGroup = new FormGroup({
    driversCtrl: this.driversFormControl
  });

  constructor(private truckService: TruckService, private driverService: DriverService,
              private cargoService: CargoService, private dialog: MatDialog) {
  }

  getTrucks() {
    this.truckSubscription = this.truckService.getFreeTrucks(this.firstFormGroup.controls.weight.value).subscribe(data => {
      this.trucks = new MatTableDataSource(data);
      console.log('Trucks: ', this.trucks);
    });
  }

  getDrivers() {
    this.driverSubscription = this.driverService.getFreeDrivers().subscribe(data => {
      this.drivers = new MatTableDataSource(data);
      console.log('Drivers: ', this.drivers);
    });
  }

  setInfo() {
    this.cargo = {
      title: this.firstFormGroup.controls.title.value,
      description: this.firstFormGroup.controls.description.value,
      weight: this.firstFormGroup.controls.weight.value
    };

    this.firstFormDisable = true;
  }

  setTruck() {
    this.cargo.truck = this.truckSelection.selected[0];
    this.secondFormDisable = true;
  }

  setDrivers() {
    this.cargo.driver = this.driversSelection.selected[0];
    this.cargo.coDriver = this.driversSelection.selected[1];
    this.isReady = true;
    this.thirdFormDisable = true;
  }

  confirm() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoSubscription = this.cargoService.addCargo(this.cargo).subscribe(data => {
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.isCreated = data;
      });
    });
  }

  check() {
    this.thirdFormGroup.patchValue({driversCtrl: this.driversSelection.selected.length});
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add a new cargo'
      }, width: '25%', height: '30%'
    });
  }

  ngOnDestroy(): void {
    if (this.truckSubscription !== undefined) {
      this.truckSubscription.unsubscribe();
    }

    if (this.driverSubscription !== undefined) {
      this.driverSubscription.unsubscribe();
    }

    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}
