import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Manager} from '../../../models/manager';
import {CustomErrorStateMatcher} from '../../commons/error-state-matcher';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit, OnDestroy {

  matcher = new CustomErrorStateMatcher();
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

  constructor(private managerService: ManagerService, private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setUpControlsUpdating();

    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.findSubscription = this.managerService.findById(param.id).subscribe((data) => {
        this.updatedManager = data;
        this.updateControls();
      });
    });

    subscription.unsubscribe();
  }

  setUpControlsUpdating() {
    this.firstNameFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.firstNameFormControl.patchValue(this.updatedManager.user.firstName);
        }
      })
    ).subscribe();

    this.lastNameFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.lastNameFormControl.patchValue(this.updatedManager.user.lastName);
        }
      })
    ).subscribe();

    this.phoneFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '' && (this.updatedManager.user.phone !== null && this.updatedManager.user.phone !== '')) {
          this.phoneFormControl.patchValue(this.updatedManager.user.phone);
        }
      })
    ).subscribe();

    this.emailFormControl.valueChanges.pipe(
      debounceTime(3000),
      map(value => {
        if (value === '') {
          this.emailFormControl.patchValue(this.updatedManager.user.email);
        }
      })
    ).subscribe();
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

  updateControls() {
    this.firstNameFormControl.patchValue(this.updatedManager.user.firstName);
    this.lastNameFormControl.patchValue(this.updatedManager.user.lastName);
    this.emailFormControl.patchValue(this.updatedManager.user.email);
    this.phoneFormControl.patchValue(this.updatedManager.user.phone);
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'edit manager'
      }, width: '17%', height: '19%'
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

