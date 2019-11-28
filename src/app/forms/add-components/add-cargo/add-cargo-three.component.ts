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
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Driver} from '../../../models/driver';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo-three.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent implements OnDestroy {

  // firstFormGroup: FormGroup;
  cargo: Cargo;
  truck: Truck;
  driver: Driver;
  coDriver: Driver;
  isFirstGroupValid = false;
  isSecondGroupValid = false;
  isThirdGroupValid = false;
  cargoWeight: number;

  isCreated = false;

  cargoSubscription: Subscription;

  firstFormGroup = new FormGroup({
    isDone: new FormControl('', Validators.requiredTrue)
  });

  secondFormGroup = new FormGroup({
    isDone: new FormControl('', Validators.requiredTrue)
  });

  thirdFormGroup = new FormGroup({
    isDone: new FormControl('', Validators.requiredTrue)
  });

  constructor(private truckService: TruckService, private driverService: DriverService,
              private cargoService: CargoService, private dialog: MatDialog) {
  }

  setUpFirstFormGroup(formGroup: FormGroup, stepper: MatStepper) {
    if (formGroup.valid) {
      this.cargo = {
        title: formGroup.controls.title.value,
        description: formGroup.controls.description.value,
        weight: formGroup.controls.weight.value
      };

      this.firstFormGroup.patchValue({isDone: true});
      this.isFirstGroupValid = true;
      this.cargoWeight = formGroup.controls.weight.value;

      stepper.next();
    }
  }

  setUpSecondFormGroup(truck: Truck, stepper: MatStepper) {
    if (truck !== undefined) {
      this.secondFormGroup.patchValue({isDone: true});
      this.isSecondGroupValid = true;
      this.cargo.truck = truck;
      stepper.next();
    }

    console.log(this.truck);
  }

  setUpThirdFormGroup(drivers1: Driver[], stepper: MatStepper) {
    if (drivers1 !== undefined) {
      this.thirdFormGroup.patchValue({isDone: true});
      this.isThirdGroupValid = true;
      /*      this.driver = drivers1.pop();
            this.coDriver = drivers1.pop();*/

      this.cargo.driver = drivers1.pop();
      this.cargo.coDriver = drivers1.pop();

      console.log(this.cargo);

      stepper.next();
    }

    console.log(this.driver);
  }

  confirm() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoSubscription = this.cargoService.addCargo(this.cargo).subscribe(data => {
        this.isCreated = data;
      });
    });
  }

  /*
    check() {
      this.thirdFormGroup.patchValue({driversCtrl: this.driversSelection.selected.length});
    }*/

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add a new cargo'
      }, width: '25%', height: '30%'
    });
  }

  ngOnDestroy(): void {
    /*    if (this.truckSubscription !== undefined) {
          this.truckSubscription.unsubscribe();
        }

        if (this.driverSubscription !== undefined) {
          this.driverSubscription.unsubscribe();
        }*/

    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}
