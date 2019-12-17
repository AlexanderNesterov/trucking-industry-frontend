import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {CustomErrorStateMatcher} from '../../../commons/error-state-matcher';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnDestroy {

  login: string;
  matcher = new CustomErrorStateMatcher();
  hide = true;
  checking = false;
  isChanged = false;
  error = '';
  subscription: Subscription;

  currentPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  newPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  passwordFormGroup = new FormGroup({
    currentPassword: this.currentPasswordFormControl,
    newPassword: this.newPasswordFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
              public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
    this.login = data.login;
  }

  changePassword() {
    const currentPassword = this.passwordFormGroup.controls.currentPassword.value;
    const newPassword = this.passwordFormGroup.controls.newPassword.value;
    this.error = '';
    this.checking = true;

    this.subscription = this.userService.changePassword(this.login, currentPassword, newPassword).subscribe(res => {
        if (res) {
          this.isChanged = true;
        }
        this.checking = false;
      }, error => {
        if (error.status === 401) {
          this.dialogRef.close();
        }
        if (error.error.message === 'Incorrect current password') {
          this.error = error.error.message;
        }
        this.checking = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
