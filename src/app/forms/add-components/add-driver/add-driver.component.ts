import {Component, DoCheck, OnDestroy} from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Driver} from '../../../models/driver';
import {Subscription} from 'rxjs';
import {User} from '../../../models/user';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {UserService} from '../../../services/user.service';
import {driverLicenseAsyncValidator, loginAsyncValidator} from '../../commons/async.validators';
import {CustomErrorStateMatcher} from '../../commons/error-state-matcher';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements DoCheck, OnDestroy {

  matcher = new CustomErrorStateMatcher();
  hide = true;
  isCreated = false;
  loginExists = false;
  driverLicenseExists = false;
  errorMessage = '';
  driver: Driver;
  driverSubscription: Subscription;

  loginFormControl: FormControl;
  passwordFormControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  phoneFormControl: FormControl;
  emailFormControl: FormControl;
  driverLicenseFormControl: FormControl;

  driverFormGroup: FormGroup;

  constructor(private driverService: DriverService, private userService: UserService,
              private dialog: MatDialog) {
    this.setUpFormGroup();
  }

  ngDoCheck(): void {
    if (this.loginExists && this.driverFormGroup.controls.login.value !== '') {
      this.loginExists = false;
    }
    if (this.driverLicenseExists && this.driverFormGroup.controls.driverLicense.value !== '') {
      this.driverLicenseExists = false;
    }
  }

  ngOnDestroy(): void {
    if (this.driverSubscription !== undefined) {
      this.driverSubscription.unsubscribe();
    }
  }

  setControls() {
    this.loginFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(32)
    ], loginAsyncValidator(this.userService));

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(32)
    ]);

    this.firstNameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z][a-z\\sA-Z]{1,31}')
    ]);

    this.lastNameFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z][a-z\\sA-Z]{1,31}')
    ]);

    this.phoneFormControl = new FormControl('', [
      Validators.pattern('\\d{11}')
    ]);

    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.driverLicenseFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('\\d{10}')
    ], driverLicenseAsyncValidator(this.driverService, -1));
  }

  setUpFormGroup() {
    this.setControls();

    this.driverFormGroup = new FormGroup({
      login: this.loginFormControl,
      password: this.passwordFormControl,
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      phone: this.phoneFormControl,
      email: this.emailFormControl,
      driverLicense: this.driverLicenseFormControl
    });
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
      }, width: '17%', height: '19%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.driverSubscription = this.driverService.save(this.driver).subscribe(data => {
        this.isCreated = data;

        setTimeout(() => {
          this.isCreated = false;
        }, 3000);

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
    });
  }
}