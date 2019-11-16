import {Component, DoCheck, OnDestroy} from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Driver} from '../../models/driver';
import {Subscription} from 'rxjs';

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
export class AddDriverComponent implements DoCheck, OnDestroy {

  matcher = new MyErrorStateMatcher();
  hide = true;
  isCreated = false;
  loginExists = false;
  driverLicenseExists = false;
  errorMessage = '';
  driver: Driver;
  subscription: Subscription;

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Za-z]{1,32}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Za-z]{1,32}')
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('\\d{11}')
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  driverLicenseFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d{10}')
  ]);

  driverFormGroup = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl,
    driverLicense: this.driverLicenseFormControl
  });

  constructor(private driverService: DriverService) {
  }

  ngDoCheck(): void {
    if (this.loginExists && this.driverFormGroup.controls.login.value !== '') {
      this.loginExists = false;
    }
    if (this.driverLicenseExists && this.driverFormGroup.controls.driverLicense.value !== '') {
      this.driverLicenseExists = false;
    }
  }

  putData() {
    this.driver = {
      driverLicense: this.driverFormGroup.controls.driverLicense.value,
      user: {
        login: this.driverFormGroup.controls.login.value,
        password: this.driverFormGroup.controls.password.value,
        firstName: this.driverFormGroup.controls.firstName.value,
        lastName: this.driverFormGroup.controls.lastName.value,
        phone: this.driverFormGroup.controls.phone.value,
        email: this.driverFormGroup.controls.email.value,
      }
    };
  }

  onSubmit() {
    this.putData();

    this.subscription = this.driverService.save(this.driver).subscribe(data => {
      this.isCreated = true;
      setTimeout(() => {
        this.isCreated = false;
      }, 10000);

      this.driverFormGroup.reset();
    }, error => {
      if ((error.error.message as string).includes('Driver with login: ')) {
        this.driverFormGroup.patchValue({login: ''});
        this.errorMessage = error.error.message;
        this.loginExists = true;
      }
      if ((error.error.message as string).includes('Driver with driver license: ')) {
        this.driverFormGroup.patchValue({driverLicense: ''});
        this.errorMessage = error.error.message;
        this.driverLicenseExists = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
