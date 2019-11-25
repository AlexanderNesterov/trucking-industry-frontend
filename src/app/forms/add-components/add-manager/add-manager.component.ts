import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Driver} from '../../../models/driver';
import {Subscription} from 'rxjs';
import {User} from '../../../models/user';
import {ManagerService} from '../../../services/manager.service';
import {ConfirmationDialogComponent} from '../../core-components/confirmation-dialog/confirmation-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
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

  managerFormGroup = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    phone: this.phoneFormControl,
    email: this.emailFormControl,
  });

  constructor(private managerService: ManagerService, private dialog: MatDialog) {
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
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();

      this.subscription = this.managerService.save(this.manager).subscribe(data => {
        this.isCreated = data;
        setTimeout(() => {
          this.isCreated = false;
        }, 3000);

        this.managerFormGroup.reset();
      }, error => {
        if ((error.error.message as string).includes('Manager with login: ')) {
          this.managerFormGroup.patchValue({login: ''});
          this.errorMessage = error.error.message;
          this.loginExists = true;
        }

      });
    });
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add new manager'
      }, width: '25%', height: '30%'
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
