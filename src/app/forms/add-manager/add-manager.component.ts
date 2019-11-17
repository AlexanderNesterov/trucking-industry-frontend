import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Driver} from '../../models/driver';
import {Subscription} from 'rxjs';
import {User} from '../../models/user';
import {ManagerService} from '../../services/manager.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnDestroy, DoCheck {

  matcher = new MyErrorStateMatcher();
  hide = true;
  isCreated = false;
  loginExists = false;
  errorMessage = '';
  manager: User;
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

  managerFormGroup = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl,
  });

  constructor(private managerService: ManagerService) {
  }

  ngDoCheck(): void {
    if (this.loginExists && this.managerFormGroup.controls.login.value !== '') {
      this.loginExists = false;
    }
  }

  putData() {
    this.manager = {
      login: this.managerFormGroup.controls.login.value,
      password: this.managerFormGroup.controls.password.value,
      firstName: this.managerFormGroup.controls.firstName.value,
      lastName: this.managerFormGroup.controls.lastName.value,
      phone: this.managerFormGroup.controls.phone.value,
      email: this.managerFormGroup.controls.email.value,
    };
  }

  onSubmit() {
    this.putData();

    this.subscription = this.managerService.save(this.manager).subscribe(data => {
      this.isCreated = true;
      setTimeout(() => {
        this.isCreated = false;
      }, 10000);

      this.managerFormGroup.reset();
    }, error => {
      if ((error.error.message as string).includes('Manager with login: ')) {
        this.managerFormGroup.patchValue({login: ''});
        this.errorMessage = error.error.message;
        this.loginExists = true;
      }

    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
