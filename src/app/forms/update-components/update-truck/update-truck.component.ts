import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {registrationNumberAsyncValidator} from '../../commons/async.validators';
import {debounceTime, map} from 'rxjs/operators';
import {CustomErrorStateMatcher} from '../../commons/error-state-matcher';

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.css']
})
export class UpdateTruckComponent implements OnInit, OnDestroy {

  matcher = new CustomErrorStateMatcher();
  updatingTruck: Truck;
  isUpdated = false;
  truckId: number;
  errorMessage = '';
  updateSubscription: Subscription;
  findSubscription: Subscription;

  registrationNumberFormControl: FormControl;
  modelFormControl: FormControl;
  capacityFormControl: FormControl;

  truckFormGroup: FormGroup;

  constructor(private truckService: TruckService, private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.truckId = param.id;
      this.setFormGroup();

      this.findSubscription = this.truckService.findById(param.id).subscribe(data => {
        this.updatingTruck = data;
        this.updateControls();
      });
    });

    subscription.unsubscribe();
    this.setUpControlsUpdating();
  }

  setFormGroup() {
    this.setControls();

    this.truckFormGroup = new FormGroup({
      registrationNumber: this.registrationNumberFormControl,
      model: this.modelFormControl,
      capacity: this.capacityFormControl
    });
  }

  setControls() {
    this.registrationNumberFormControl = new FormControl('', [
      Validators.pattern('[A-Z]{2}\\d{5}')
    ], registrationNumberAsyncValidator(this.truckService, this.truckId));

    this.modelFormControl = new FormControl('', [
      Validators.maxLength(32)
    ]);

    this.capacityFormControl = new FormControl('', [
      Validators.pattern('\\d+\\.?\\d*')
    ]);
  }

  setUpControlsUpdating() {
    this.registrationNumberFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.registrationNumberFormControl.patchValue(this.updatingTruck.registrationNumber);
        }
      })
    ).subscribe();

    this.modelFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.modelFormControl.patchValue(this.updatingTruck.model);
        }
      })
    ).subscribe();

    this.capacityFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.capacityFormControl.patchValue(this.updatingTruck.capacity);
        }
      })
    ).subscribe();
  }

  updateControls() {
    this.registrationNumberFormControl.patchValue(this.updatingTruck.registrationNumber);
    this.modelFormControl.patchValue(this.updatingTruck.model);
    this.capacityFormControl.patchValue(this.updatingTruck.capacity);
  }

  putData() {
    let changedData = this.truckFormGroup.controls.registrationNumber.value;
    this.updatingTruck.registrationNumber = changedData === '' ? this.updatingTruck.registrationNumber : changedData;

    changedData = this.truckFormGroup.controls.model.value;
    this.updatingTruck.model = changedData === '' ? this.updatingTruck.model : changedData;

    changedData = this.truckFormGroup.controls.capacity.value;
    this.updatingTruck.capacity = changedData === '' ? this.updatingTruck.capacity : changedData;
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'edit truck'
      }, width: '17%', height: '19%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.updateSubscription = this.truckService.update(this.updatingTruck).subscribe(data => {
        this.isUpdated = data;
      }, error => {
        if ((error.error.message as string).includes('Truck with registration number: ')) {
          this.errorMessage = error.error.message;
          this.truckFormGroup.patchValue({registrationNumber: this.updatingTruck.registrationNumber});
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

