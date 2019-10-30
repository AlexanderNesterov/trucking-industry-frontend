import {Component} from '@angular/core';
import {DriverService} from '../../services/driver.service';
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

  matcher = new MyErrorStateMatcher();

  driver: Driver;

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit() {
    this.driver = {
      driverLicense: this.driverFormGroup.controls.driverLicense.value,
      userDto: {
        login: this.driverFormGroup.controls.login.value,
        password: this.driverFormGroup.controls.password.value,
        firstName: this.driverFormGroup.controls.firstName.value,
        lastName: this.driverFormGroup.controls.lastName.value,
        phone: this.driverFormGroup.controls.phone.value,
        email: this.driverFormGroup.controls.email.value,
      }
    };

    this.driverService.save(this.driver).subscribe();
  }
}
