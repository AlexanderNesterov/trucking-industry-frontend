import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Cargo} from '../../../models/cargo';
import {MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {DriverService} from '../../../services/driver.service';
import {OrderService} from '../../../services/order.service';
import {Subscription} from 'rxjs';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Driver} from '../../../models/driver';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddCargoComponent implements OnDestroy {

  order: Order;
  truck: Truck;
  driver: Driver;
  coDriver: Driver;
  cargoList: Cargo[];
  isFirstGroupValid = false;
  isSecondGroupValid = false;
  isThirdGroupValid = false;
  totalWeight = 0;
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
              private cargoService: OrderService, private dialog: MatDialog) {
  }

  setUpFirstFormGroup(cargoList: Cargo[], stepper: MatStepper) {
    if (cargoList.length > 0) {
      this.firstFormGroup.patchValue({isDone: true});
      this.isFirstGroupValid = true;
      this.cargoList = cargoList;

      for (const cargo of cargoList) {
        this.totalWeight += cargo.weight;
      }

      stepper.next();
    }
  }

  setUpSecondFormGroup(truck: Truck, stepper: MatStepper) {
    if (truck !== undefined) {
      this.secondFormGroup.patchValue({isDone: true});
      this.isSecondGroupValid = true;
      this.truck = truck;
      stepper.next();
    }
  }

  setUpThirdFormGroup(drivers1: Driver[], stepper: MatStepper) {
    if (drivers1 !== undefined) {
      this.thirdFormGroup.patchValue({isDone: true});
      this.isThirdGroupValid = true;
      this.driver = drivers1.pop();
      this.coDriver = drivers1.pop();

      this.putData();

      // this.cargo.driver = drivers1.pop();
      // this.cargo.coDriver = drivers1.pop();

      stepper.next();
    }
  }

  putData() {
    this.order = {
      driver: this.driver,
      coDriver: this.coDriver,
      truck: this.truck,
      cargoList: this.cargoList,
      totalWeight: this.totalWeight
    };
  }

  confirm() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoSubscription = this.cargoService.addOrder(this.order).subscribe(data => {
        this.isCreated = data;
      });
    });
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add a new cargo'
      }, width: '25%', height: '30%'
    });
  }

  ngOnDestroy(): void {
    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}
