import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {Cargo} from '../../../models/cargo';
import {CargoService} from '../../../services/cargo.service';
import {Driver} from '../../../models/driver';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import {PermissionService} from '../../../services/permision.service';
import {User} from '../../../models/user';
import {ManagerService} from '../../../services/manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-info',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  id: number;
  isFreeDriver = false;
  isCargoInProgress = false;
  personalInformation: User;
  driverInformation: Driver;
  cargo: Cargo = undefined;
  userSubscription: Subscription;
  cargoSubscription: Subscription;

  constructor(private driverService: DriverService, private dialog: MatDialog,
              private cargoService: CargoService, private permissionService: PermissionService,
              private managerService: ManagerService, private router: Router) {
  }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem('id'), 10);
    if (this.permissionService.check('DRIVER')) {
      this.userSubscription = this.driverService.findById(this.id).subscribe(data => {
        this.personalInformation = data.user;
        this.driverInformation = data;
        this.getCargo();
      });
    }

    if (this.permissionService.check('ADMIN')) {
      this.userSubscription = this.managerService.findById(this.id).subscribe(data => {
        this.personalInformation = data;
      });
    }
  }

  getCargo() {
    this.cargoSubscription = this.cargoService.getCargoByDriverId(this.id).subscribe(data => {
      this.cargo = data;

      console.log('data', this.cargo);

      if (this.cargo.status === 'IN_PROGRESS') {
        this.isCargoInProgress = true;
      }

      console.log(this.cargo);
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

      this.cargoService.setAcceptStatus(this.cargo.id, this.id).subscribe(() => {
        this.getCargo();
      });
    });
  }

  refuse() {
    this.openDialog('refuse cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoService.setRefuseStatus(this.cargo.id, this.id).subscribe(data => {
        if (data) {
          this.isFreeDriver = true;
          this.cargo = undefined;
        }
      });
    });
  }

  deliver() {
    this.openDialog('deliver cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoService.setDeliverStatus(this.cargo.id, this.id).subscribe(data => {
        if (data) {
          this.cargo = undefined;
          this.isFreeDriver = true;
        }
      });
    });
  }

  edit() {
    this.router.navigate([`/update-manager`], {queryParams: {id: this.id}});
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
