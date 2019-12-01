import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {OrderService} from '../../../services/order.service';
import {Driver} from '../../../models/driver';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import {PermissionService} from '../../../services/permision.service';
import {User} from '../../../models/user';
import {ManagerService} from '../../../services/manager.service';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-driver-info',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  managerId: number;
  driverId: number;
  isFreeDriver = false;
  isCargoInProgress = false;
  personalInformation: User;
  driverInformation: Driver;
  order: Order = undefined;
  userSubscription: Subscription;
  cargoSubscription: Subscription;

  constructor(private driverService: DriverService, private dialog: MatDialog,
              private orderService: OrderService, private permissionService: PermissionService,
              private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    if (this.permissionService.check('DRIVER')) {
      this.driverId = parseInt(localStorage.getItem('driverId'), 10);
      this.userSubscription = this.driverService.findById(this.driverId).subscribe(data => {
        this.personalInformation = data.user;
        this.driverInformation = data;
        this.getOrder();
      });
    }

    if (this.permissionService.check('ADMIN')) {
      this.managerId = parseInt(localStorage.getItem('userId'), 10);
      this.userSubscription = this.managerService.findById(this.managerId).subscribe(data => {
        this.personalInformation = data;
      });
    }
  }

  getOrder() {
    this.cargoSubscription = this.orderService.getOrderByDriverId(this.driverId).subscribe(data => {
      this.order = data;

      console.log('data', this.order);

      if (this.order.status === 'IN_PROGRESS') {
        this.isCargoInProgress = true;
      }

      console.log(this.order);
    }, error => {
      if ((error.error.message as string).includes('Cargo with driver id')) {
        this.isFreeDriver = true;
      }
    });
  }

  openDialog(message: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message
      }, width: '25%', height: '30%'
    });
  }

  accept() {
    this.openDialog('accept cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.orderService.setAcceptStatus(this.order.id, this.driverId).subscribe(() => {
        this.getOrder();
      });
    });
  }

  refuse() {
    this.openDialog('refuse cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.orderService.setRefuseStatus(this.order.id, this.driverId).subscribe(data => {
        if (data) {
          this.isFreeDriver = true;
          this.order = undefined;
        }
      });
    });
  }

  deliver() {
    this.openDialog('deliver cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.orderService.setDeliverStatus(this.order.id, this.driverId).subscribe(data => {
        if (data) {
          this.order = undefined;
          this.isFreeDriver = true;
        }
      });
    });
  }

  edit() {
    this.router.navigate([`/update-manager`], {queryParams: {id: this.managerId}});
  }

  checkRole(role: string): boolean {
    return this.permissionService.check(role);
  }

  ngOnDestroy(): void {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }

    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}
