import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {

  login: string;
  matcher = new MyErrorStateMatcher();
  hide = true;

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
    this.userService.changeAdminPassword(this.login, currentPassword, newPassword).subscribe();
  }
}
