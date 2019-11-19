import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
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
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit, OnDestroy {

  matcher = new MyErrorStateMatcher();
  updatedManager: User = undefined;
  isUpdated = false;
  findSubscription: Subscription;
  updateSubscription: Subscription;
  hardcodedManager = 35;

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

  constructor(private managerService: ManagerService) {
  }

  ngOnInit() {
    this.findSubscription = this.managerService.findById(this.hardcodedManager).subscribe((data) => {
      this.updatedManager = data;
    });
  }

  putData() {

    let changedData = this.managerFormGroup.controls.firstName.value;
    this.updatedManager.firstName = changedData === '' ? this.updatedManager.firstName : changedData;

    changedData = this.managerFormGroup.controls.lastName.value;
    this.updatedManager.lastName = changedData === '' ? this.updatedManager.lastName : changedData;

    changedData = this.managerFormGroup.controls.email.value;
    this.updatedManager.email = changedData === '' ? this.updatedManager.email : changedData;

    changedData = this.managerFormGroup.controls.phone.value;
    this.updatedManager.phone = changedData === '' ? this.updatedManager.phone : changedData;
  }

  onSubmit() {
    this.putData();
    this.updateSubscription = this.managerService.update(this.updatedManager).subscribe(data => {
      this.isUpdated = data;
      console.log(data);
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

