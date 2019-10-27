import {Component, OnInit} from '@angular/core';
import {Driver} from '../../models/driver';
import {DriverService} from '../../services/driver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

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
export class UpdateDriverComponent implements OnInit {

  updatedDriver: Driver;

  firstNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z]{1,20}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z]{1,20}')
  ]);

  driverLicenseFormControl = new FormControl('', [
    Validators.pattern('\\d{10}')
  ]);

  driverFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    driverLicense: this.driverLicenseFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.driverService.findById(8).subscribe((data) => {
      this.updatedDriver = data;
    });
  }

  putData() {

/*    let changedData = this.driverFormGroup.controls.firstName.value;
    this.updatedDriver.firstName = changedData === '' ? this.updatedDriver.firstName : changedData;

    changedData = this.driverFormGroup.controls.lastName.value;
    this.updatedDriver.lastName = changedData === '' ? this.updatedDriver.lastName : changedData;

    changedData = this.driverFormGroup.controls.driverLicense.value;
    this.updatedDriver.driverLicense = changedData === '' ? this.updatedDriver.driverLicense : changedData;*/
  }

  onSubmit() {
    this.putData();
    console.log(this.updatedDriver);
    this.driverService.update(this.updatedDriver).subscribe();
  }
}
