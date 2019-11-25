import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Cargo} from '../../../models/cargo';
import {MatDialog, MatDialogRef, MatStepper, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DriverService} from '../../../services/driver.service';
import {CargoService} from '../../../services/cargo.service';
import {Subscription} from 'rxjs';
import {ConfirmationDialogComponent} from '../../core-components/confirmation-dialog/confirmation-dialog.component';
import {Driver} from '../../../models/driver';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo-three.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent implements OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  truck: Truck;
  driver: Driver;
  coDriver: Driver;
  isFirstGroupValid = false;
  isSecondGroupValid = false;
  isThirdGroupValid = false;
  cargoWeight: number;



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

  driversFormControl = new FormControl(0, [
    Validators.min(2)
  ]);

  thirdFormGroup = new FormGroup({
    driversCtrl: this.driversFormControl
  });

  constructor(private truckService: TruckService, private driverService: DriverService,
              private cargoService: CargoService, private dialog: MatDialog) {
  }

  setUpFirstFormGroup(formGroup: FormGroup, stepper: MatStepper) {
    this.firstFormGroup = formGroup;

    if (this.firstFormGroup.valid) {
      this.isFirstGroupValid = true;
      this.cargoWeight = this.firstFormGroup.controls.weight.value;
      console.log(stepper);
      stepper.next();
    }
    console.log(this.cargoWeight);
  }

  setUpSecondFormGroup(truck: Truck) {
    if (truck !== undefined) {
      this.isSecondGroupValid = true;
      this.truck = truck;
    }

    console.log(this.truck);
  }

  setUpThirdFormGroup(drivers1: Driver[]) {
    if (drivers1 !== undefined) {
      this.isThirdGroupValid = true;
      this.driver = drivers1.pop();
      this.coDriver = drivers1.pop();
    }

    console.log(this.driver);
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
