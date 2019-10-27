import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css']
})
export class AddTruckComponent {

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

  matcher = new MyErrorStateMatcher();

  truck: Truck;

  constructor(private truckService: TruckService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit() {
    this.truck = {
      registrationNumber: this.truckFormGroup.controls.registrationNumber.value,
      model: this.truckFormGroup.controls.model.value,
      capacity: this.truckFormGroup.controls.capacity.value
    };

    this.truckService.save(this.truck).subscribe();
  }

}
