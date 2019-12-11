import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../services/driver.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {driverLicenseAsyncValidator} from '../../commons/async.validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
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

  driverId: number;

  firstNameFormControl = new FormControl('', [
    Validators.pattern('[[A-Z]|[a-z]][[a-z]|\\s|[A-Z]]{1,31}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.pattern('[[A-Z]|[a-z]][[a-z]|\\s|[A-Z]]{1,31}')
  ]);

  emailFormControl = new FormControl('', [
    Validators.email
  ]);

  phoneFormControl = new FormControl('', [
    Validators.pattern('\\d{11}')
  ]);

  driverLicenseFormControl: FormControl;

  /*driverLicenseFormControl = new FormControl('', [
    Validators.pattern('\\d{10}')
  ], driverLicenseAsyncValidator(this.driverService, this.driverId));*/

  driverFormGroup: FormGroup;

  /*  driverFormGroup = new FormGroup({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      email: this.emailFormControl,
      phone: this.phoneFormControl,
      driverLicense: this.driverLicenseFormControl
    });*/

  constructor(private driverService: DriverService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.driverId = param.id;

      this.driverLicenseFormControl = new FormControl('', [
        Validators.pattern('\\d{10}')
      ], driverLicenseAsyncValidator(this.driverService, this.driverId));

      this.driverFormGroup = new FormGroup({
        firstName: this.firstNameFormControl,
        lastName: this.lastNameFormControl,
        email: this.emailFormControl,
        phone: this.phoneFormControl,
        driverLicense: this.driverLicenseFormControl
      });
      this.findSubscription = this.driverService.findById(param.id).subscribe((data) => {
        this.updatedDriver = data;

        this.updateControls();
      });
    });

    subscription.unsubscribe();
  }

  ngOnInit() {

  }

  private updateControls() {
    this.firstNameFormControl.patchValue(this.updatedDriver.user.firstName);
    this.lastNameFormControl.patchValue(this.updatedDriver.user.lastName);
    this.emailFormControl.patchValue(this.updatedDriver.user.email);
    this.phoneFormControl.patchValue(this.updatedDriver.user.phone);
    this.driverLicenseFormControl.patchValue(this.updatedDriver.driverLicense);
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

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'edit driver'
      }, width: '25%', height: '30%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();
      this.updateSubscription = this.driverService.update(this.updatedDriver).subscribe(data => {
        this.isUpdated = data;
        console.log(data);
      }, error => {
        console.log(error);
        if ((error.error.message as string).includes('Driver with driver license')) {
          this.driverFormGroup.patchValue({driverLicense: ''});
          this.driverLicenseExists = true;
          this.errorMessage = error.error.message;
        }
      });
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
