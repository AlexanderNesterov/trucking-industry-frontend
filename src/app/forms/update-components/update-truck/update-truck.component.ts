import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {registrationNumberAsyncValidator} from '../../commons/async.validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.css']
})
export class UpdateTruckComponent implements OnInit, OnDestroy {

  matcher = new MyErrorStateMatcher();
  oldTruck: Truck;
  newTruck: Truck;
  isUpdated = false;
  errorMessage = '';
  updateSubscription: Subscription;
  findSubscription: Subscription;

  /*registrationNumberFormControl = new FormControl('', [
    Validators.pattern('[A-Z]{2}\\d{5}')
  ]);*/

  registrationNumberFormControl: FormControl;

  modelFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  capacityFormControl = new FormControl('', [
    Validators.pattern('\\d+\\.?\\d*')
  ]);

/*  truckFormGroup = new FormGroup({
    registrationNumber: this.registrationNumberFormControl,
    model: this.modelFormControl,
    capacity: this.capacityFormControl
  });*/

  truckFormGroup: FormGroup;

  constructor(private truckService: TruckService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.registrationNumberFormControl = new FormControl('', [
        Validators.pattern('[A-Z]{2}\\d{5}')
      ], registrationNumberAsyncValidator(this.truckService, param.id));

      this.truckFormGroup = new FormGroup({
        registrationNumber: this.registrationNumberFormControl,
        model: this.modelFormControl,
        capacity: this.capacityFormControl
      });

      this.findSubscription = this.truckService.findById(param.id).subscribe(data => {
        this.oldTruck = data;
      });
    });

    subscription.unsubscribe();
  }

  putData() {
    this.newTruck = {
      id: this.oldTruck.id,
      model: this.truckFormGroup.controls.model.value === '' ? this.oldTruck.model : this.truckFormGroup.controls.model.value,
      capacity: this.truckFormGroup.controls.capacity.value === '' ? this.oldTruck.capacity : this.truckFormGroup.controls.capacity.value,
      registrationNumber: this.truckFormGroup.controls.registrationNumber.value === '' ?
        this.oldTruck.registrationNumber : this.truckFormGroup.controls.registrationNumber.value
    };
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'edit truck'
      }, width: '25%', height: '30%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.updateSubscription = this.truckService.update(this.newTruck).subscribe(data => {
        this.isUpdated = data;
        this.oldTruck = this.newTruck;
      }, error => {
        if ((error.error.message as string).includes('Truck with registration number: ')) {
          this.errorMessage = error.error.message;
          this.truckFormGroup.patchValue({registrationNumber: this.oldTruck.registrationNumber});
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription !== undefined) {
      this.updateSubscription.unsubscribe();
    }

    if (this.findSubscription !== undefined) {
      this.findSubscription.unsubscribe();
    }
  }
}

