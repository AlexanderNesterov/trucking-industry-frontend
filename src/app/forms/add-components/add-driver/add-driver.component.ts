import {Component, DoCheck, OnDestroy} from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Driver} from '../../../models/driver';
import {Subscription} from 'rxjs';
import {User} from '../../../models/user';
import {ConfirmationDialogComponent} from '../../core-components/confirmation-dialog/confirmation-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
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
    Validators.pattern('[[A-Z]|[a-z]][[a-z]|\\s|[A-Z]]{1,31}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[[A-Z]|[a-z]][[a-z]|\\s|[A-Z]]{1,31}')
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

  constructor(private driverService: DriverService, private dialog: MatDialog) {
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
    const innerUser = {
      login: this.driverFormGroup.controls.login.value,
      password: this.driverFormGroup.controls.password.value,
      firstName: this.driverFormGroup.controls.firstName.value,
      lastName: this.driverFormGroup.controls.lastName.value,
      phone: this.driverFormGroup.controls.phone.value,
      email: this.driverFormGroup.controls.email.value
    };

    this.driver = {
      driverLicense: this.driverFormGroup.controls.driverLicense.value,
      user: innerUser as User
    };
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add a new driver'
      }, width: '25%', height: '30%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.subscription = this.driverService.save(this.driver).subscribe(data => {
        this.isCreated = data;
        setTimeout(() => {
          this.isCreated = false;
        }, 3000);

        this.driverFormGroup.reset();
      }, error => {
        console.log(error);
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
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
