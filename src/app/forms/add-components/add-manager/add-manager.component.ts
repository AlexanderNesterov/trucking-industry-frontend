import {Component, DoCheck, OnDestroy} from '@angular/core';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Subscription, timer} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Manager} from '../../../models/manager';
import {UserService} from '../../../services/user.service';
import {loginAsyncValidator} from '../../commons/async.validators';

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
  manager: Manager;
  subscription: Subscription;

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ], loginAsyncValidator(this.userService));

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

  constructor(private managerService: ManagerService, private userService: UserService, private dialog: MatDialog) {
  }

  ngDoCheck(): void {
    if (this.loginExists && this.managerFormGroup.controls.login.value !== '') {
      this.loginExists = false;
    }
  }

  putData() {
    this.manager = {
      user: {
        login: this.managerFormGroup.controls.login.value,
        password: this.managerFormGroup.controls.password.value,
        firstName: this.managerFormGroup.controls.firstName.value,
        lastName: this.managerFormGroup.controls.lastName.value,
        phone: this.managerFormGroup.controls.phone.value,
        email: this.managerFormGroup.controls.email.value,
      }
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
      }, width: '17%', height: '19%'
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
