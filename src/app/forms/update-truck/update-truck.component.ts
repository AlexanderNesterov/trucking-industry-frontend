import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';
import {Subscription} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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
  hardcodedTruck = 7;

  registrationNumberFormControl = new FormControl('', [
    Validators.pattern('[A-Z]{2}\\d{5}')
  ]);

  modelFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  capacityFormControl = new FormControl('', [
    Validators.pattern('\\d+\\.?\\d*')
  ]);

  truckFormGroup = new FormGroup({
    registrationNumber: this.registrationNumberFormControl,
    model: this.modelFormControl,
    capacity: this.capacityFormControl
  });

  constructor(private truckService: TruckService) {
  }

  ngOnInit(): void {
    this.findSubscription = this.truckService.findById(this.hardcodedTruck).subscribe(data => {
      this.oldTruck = data;
    });
  }

  putData() {
    this.newTruck = {
      id: this.oldTruck.id,
      model: this.truckFormGroup.controls.model.value === '' ? this.oldTruck.model : this.truckFormGroup.controls.model.value,
      capacity: this.truckFormGroup.controls.capacity.value === '' ? this.oldTruck.capacity : this.truckFormGroup.controls.capacity.value,
      registrationNumber: this.truckFormGroup.controls.registrationNumber.value === '' ?
        this.oldTruck.registrationNumber : this.truckFormGroup.controls.registrationNumber.value
    };
    /*    let changedData = this.truckFormGroup.controls.model.value;
        this.newTruck.model = changedData === '' ? this.oldTruck.model : changedData;

        changedData = this.truckFormGroup.controls.capacity.value;
        this.newTruck.capacity = changedData === '' ? this.oldTruck.capacity : changedData;

        changedData = this.truckFormGroup.controls.registrationNumber.value;
        this.newTruck.registrationNumber = changedData === '' ? this.oldTruck.registrationNumber : changedData;*/
  }

  onSubmit() {
    this.putData();

    this.updateSubscription = this.truckService.update(this.newTruck).subscribe(data => {
      this.isUpdated = true;
    }, error => {
      if ((error.error.message as string).includes('Truck with registration number: ')) {
        this.errorMessage = error.error.message;
        this.truckFormGroup.patchValue({registrationNumber: this.oldTruck.registrationNumber});
      }
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

