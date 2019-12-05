import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Manager} from '../../../models/manager';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit, OnDestroy {

  matcher = new MyErrorStateMatcher();
  updatedManager: Manager = undefined;
  isUpdated = false;
  findSubscription: Subscription;
  updateSubscription: Subscription;

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

  managerFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    email: this.emailFormControl,
    phone: this.phoneFormControl,
  });

  constructor(private managerService: ManagerService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.findSubscription = this.managerService.findById(param.id).subscribe((data) => {
        this.updatedManager = data;
      });
    });

    subscription.unsubscribe();
  }

  putData() {

    let changedData = this.managerFormGroup.controls.firstName.value;
    this.updatedManager.user.firstName = changedData === '' ? this.updatedManager.user.firstName : changedData;

    changedData = this.managerFormGroup.controls.lastName.value;
    this.updatedManager.user.lastName = changedData === '' ? this.updatedManager.user.lastName : changedData;

    changedData = this.managerFormGroup.controls.email.value;
    this.updatedManager.user.email = changedData === '' ? this.updatedManager.user.email : changedData;

    changedData = this.managerFormGroup.controls.phone.value;
    this.updatedManager.user.phone = changedData === '' ? this.updatedManager.user.phone : changedData;
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'edit manager'
      }, width: '25%', height: '30%'
    });
  }

  onSubmit() {
    this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.putData();
      this.updateSubscription = this.managerService.update(this.updatedManager).subscribe(data => {
        this.isUpdated = data;
        console.log(data);
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

