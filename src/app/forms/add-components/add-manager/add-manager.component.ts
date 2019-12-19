import {Component, DoCheck, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Manager} from '../../../models/manager';
import {UserService} from '../../../services/user.service';
import {loginAsyncValidator} from '../../commons/async.validators';
import {CustomErrorStateMatcher} from '../../commons/error-state-matcher';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnDestroy, DoCheck {

  matcher = new CustomErrorStateMatcher();
  hide = true;
  isCreated = false;
  loginExists = false;
  errorMessage = '';
  manager: Manager;
  managerSubscription: Subscription;

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
    Validators.pattern('[A-Z][a-z\\sA-Z]{1,31}')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z][a-z\\sA-Z]{1,31}')
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

  constructor(private managerService: ManagerService, private userService: UserService,
              private dialog: MatDialog) {
  }

  ngDoCheck(): void {
    if (this.loginExists && this.managerFormGroup.controls.login.value !== '') {
      this.loginExists = false;
    }
  }

  ngOnDestroy(): void {
    if (this.managerSubscription !== undefined) {
      this.managerSubscription.unsubscribe();
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

      this.managerSubscription = this.managerService.save(this.manager).subscribe(data => {
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
}
