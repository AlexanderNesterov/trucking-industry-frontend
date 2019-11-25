import {Component, DoCheck, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {ConfirmationDialogComponent} from '../../core-components/confirmation-dialog/confirmation-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css']
})
export class AddTruckComponent implements DoCheck, OnDestroy {

  matcher = new MyErrorStateMatcher();
  isCreated = false;
  registrationNumberExists = false;
  errorMessage = '';
  truck: Truck;
  subscription: Subscription;

  registrationNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z]{2}\\d{5}')
  ]);

  modelFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  capacityFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d+\\.?\\d*')
  ]);

  truckFormGroup = new FormGroup({
    registrationNumber: this.registrationNumberFormControl,
    model: this.modelFormControl,
    capacity: this.capacityFormControl
  });

  constructor(private truckService: TruckService, private dialog: MatDialog) {
  }

  ngDoCheck(): void {
    if (this.registrationNumberExists && this.truckFormGroup.controls.registrationNumber.value !== '') {
      this.registrationNumberExists = false;
    }
  }

  putData() {
    this.truck = {
      registrationNumber: this.truckFormGroup.controls.registrationNumber.value,
      model: this.truckFormGroup.controls.model.value,
      capacity: this.truckFormGroup.controls.capacity.value
    };
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add new truck'
      }, width: '25%', height: '30%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.subscription = this.truckService.save(this.truck).subscribe(data => {
        this.isCreated = data;

        setTimeout(() => {
          this.isCreated = false;
        }, 3000);

        this.truckFormGroup.reset();
      }, error => {
        if ((error.error.message as string).includes('Truck with registration number')) {
          this.truckFormGroup.patchValue({registrationNumber: ''});
          this.registrationNumberExists = true;
          this.errorMessage = error.error.message;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
