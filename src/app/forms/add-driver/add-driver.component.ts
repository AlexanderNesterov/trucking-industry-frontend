import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Driver} from '../../models/driver';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent {

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20)
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20)
  ]);

  driverLicenseFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d{10}')
  ]);

  driverFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    driverLicense: this.driverLicenseFormControl
  });

  matcher = new MyErrorStateMatcher();

  driver: Driver;

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit() {
    this.driver = {
      firstName: this.driverFormGroup.controls.firstName.value,
      lastName: this.driverFormGroup.controls.lastName.value,
      driverLicense: this.driverFormGroup.controls.driverLicense.value
    };

    this.driverService.save(this.driver).subscribe();
  }
}
