import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit, OnDestroy {

  order: Order;
  truck: Truck;
  driver: Driver;
  coDriver: Driver;
  cargoList: Cargo[];
  orderId: number;
  isFirstGroupValid = false;
  isSecondGroupValid = false;
  isThirdGroupValid = false;
  totalWeight = 0;
  isCreated = false;
  orderSubscription: Subscription;

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
              private orderService: OrderService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderService.findById(params.id).subscribe(res => {
        this.cargoList = res.cargoList;
        this.truck = res.truck;
        this.orderId = res.id;
      });
    });
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

  setUpThirdFormGroup(drivers: Driver[], stepper: MatStepper) {
    if (drivers !== undefined) {
      this.thirdFormGroup.patchValue({isDone: true});
      this.isThirdGroupValid = true;
      this.coDriver = drivers.pop();
      this.driver = drivers.pop();

      this.putData();
      stepper.next();
    }
  }

  putData() {
    this.order = {
      id: this.orderId,
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

      this.orderSubscription = this.orderService.updateOrder(this.order).subscribe(data => {
        this.isCreated = data;
      });
    });
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add a new cargo'
      }, width: '17%', height: '19%'
    });
  }

  ngOnDestroy(): void {
    if (this.orderSubscription !== undefined) {
      this.orderSubscription.unsubscribe();
    }
  }
}
