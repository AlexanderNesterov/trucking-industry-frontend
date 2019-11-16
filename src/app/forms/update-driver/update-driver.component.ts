import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../models/driver';
import {DriverService} from '../../services/driver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Subscription} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnInit, OnDestroy, DoCheck {

  matcher = new MyErrorStateMatcher();
  driverLicenseExists = false;
  errorMessage = '';
  updatedDriver: Driver = undefined;
  isUpdated = false;
  findSubscription: Subscription;
  updateSubscription: Subscription;

  hardcodedDriver = 5;

  firstNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z]{1,20}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z]{1,20}')
  ]);

  emailFormControl = new FormControl('', [
    Validators.email
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('\\d{11}')
  ]);

  driverLicenseFormControl = new FormControl('', [
    Validators.pattern('\\d{10}')
  ]);

  driverFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    email: this.emailFormControl,
    phone: this.phoneFormControl,
    driverLicense: this.driverLicenseFormControl
  });

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.findSubscription = this.driverService.findById(this.hardcodedDriver).subscribe((data) => {
      this.updatedDriver = data;
    });
    /*this.driverService.findById(this.hardcodedDriver).subscribe((data) => {
      this.updatedDriver = data;
    });*/
  }

  ngDoCheck(): void {
    if (this.driverLicenseExists && this.driverFormGroup.controls.driverLicense.value !== '') {
      this.driverLicenseExists = false;
    }
  }

  putData() {

    let changedData = this.driverFormGroup.controls.firstName.value;
    this.updatedDriver.user.firstName = changedData === '' ? this.updatedDriver.user.firstName : changedData;

    changedData = this.driverFormGroup.controls.lastName.value;
    this.updatedDriver.user.lastName = changedData === '' ? this.updatedDriver.user.lastName : changedData;

    changedData = this.driverFormGroup.controls.email.value;
    this.updatedDriver.user.email = changedData === '' ? this.updatedDriver.user.email : changedData;

    changedData = this.driverFormGroup.controls.phone.value;
    this.updatedDriver.user.phone = changedData === '' ? this.updatedDriver.user.phone : changedData;

    changedData = this.driverFormGroup.controls.driverLicense.value;
    this.updatedDriver.driverLicense = changedData === '' ? this.updatedDriver.driverLicense : changedData;
  }

  onSubmit() {
    this.putData();
    this.updateSubscription = this.driverService.update(this.updatedDriver).subscribe(data => {
      this.isUpdated = true;
      console.log(data);
    }, error => {
      console.log(error);
      if ((error.error.message as string).includes('Driver with driver license')) {
        this.driverFormGroup.patchValue({driverLicense: ''});
        this.driverLicenseExists = true;
        this.errorMessage = error.error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.findSubscription !== undefined) {
      this.findSubscription.unsubscribe();
    }

    if (this.updateSubscription !== undefined) {
      this.updateSubscription.unsubscribe();
    }
  }
}
