import {Component, OnDestroy, OnInit} from '@angular/core';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../services/driver.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {

  drivers: Driver[];
  displayedColumns: string[] = ['id', 'name', 'driverLicense', 'contact', 'statuses', 'action'];
  driverSubscription: Subscription;
  userSubscription: Subscription;
  page = 1;
  size = 10;
  textSearch = '';

  constructor(private driverService: DriverService, private router: Router,
              private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getDrivers();
  }

  updateDriver(driverId: number) {
    this.router.navigate([`/update-driver`], {queryParams: {id: driverId}});
  }

  blockAccount(userId: number, driverId: number) {
    this.openDialog('block account').afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.driverSubscription = this.driverService.blockDriverAccount(userId, driverId).subscribe(() => {
        this.getDrivers();
      });
    });
  }

  unlockAccount(userId: number) {
    this.openDialog('unlock account').afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.userSubscription = this.userService.unlockAccount(userId).subscribe(() => {
        this.getDrivers();
      });
    });
  }

  getDrivers() {
    this.driverSubscription = this.driverService.getDrivers(this.textSearch, this.page, this.size).subscribe(res => {
      this.drivers = res;
    });
  }

  doSearch(text: string) {
    this.drivers = undefined;
    this.textSearch = text;
    this.page = 1;

    this.getDrivers();
  }

  pageChange(page: number) {
    this.page = page;
    this.getDrivers();
  }

  sizeChange(size: number) {
    this.size = size;
    this.getDrivers();
  }

  addNewDriver() {
    this.router.navigate(['/add-driver']);
  }

  openDialog(message: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message
      }, width: '17%', height: '19%'
    });
  }

  ngOnDestroy(): void {
    if (this.driverSubscription !== undefined) {
      this.driverSubscription.unsubscribe();
    }


    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }
}
