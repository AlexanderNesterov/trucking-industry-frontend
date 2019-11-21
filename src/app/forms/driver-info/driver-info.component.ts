import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {Cargo} from '../../models/cargo';
import {CargoService} from '../../services/cargo.service';
import {Driver} from '../../models/driver';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit, OnDestroy {

  isFreeDriver = false;
  isCargoInProgress = false;
  personalInformation: Driver;
  cargo: Cargo = undefined;
  driverSubscription: Subscription;
  cargoSubscription: Subscription;
  hardCodedDriverId = 30;

  constructor(private driverService: DriverService, private dialog: MatDialog, private cargoService: CargoService) {
  }

  ngOnInit() {
    this.driverSubscription = this.driverService.findById(this.hardCodedDriverId).subscribe(data => {
      this.personalInformation = data;
      this.getCargo();
      console.log(this.personalInformation);
    });
  }

  getCargo() {
    this.cargoSubscription = this.cargoService.getCargoByDriverId(this.hardCodedDriverId).subscribe(data => {
      this.cargo = data;

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

      this.cargoService.setAcceptStatus(this.cargo.id, this.hardCodedDriverId).subscribe(() => {
        this.getCargo();
      });
    });
  }

  refuse() {
    this.openDialog('refuse cargo').afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.cargoService.setRefuseStatus(this.cargo.id, this.hardCodedDriverId).subscribe(data => {
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

      this.cargoService.setDeliverStatus(this.cargo.id, this.hardCodedDriverId).subscribe(data => {
        if (data) {
          this.cargo = undefined;
          this.isFreeDriver = true;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.driverSubscription !== undefined) {
      this.driverSubscription.unsubscribe();
    }

    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}
