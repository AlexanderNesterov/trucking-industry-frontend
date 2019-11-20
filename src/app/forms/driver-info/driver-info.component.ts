import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {Cargo} from '../../models/cargo';
import {CargoService} from '../../services/cargo.service';
import {Driver} from '../../models/driver';
import {Subscription} from 'rxjs';

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
  hardCodedDriverId = 23;

  constructor(private driverService: DriverService, private cargoService: CargoService) {
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

  accept() {
    this.cargoService.setAcceptStatus(this.cargo.id, this.hardCodedDriverId).subscribe(() => {
      this.getCargo();
    });
  }

  refuse() {
    this.cargoService.setRefuseStatus(this.cargo.id, this.hardCodedDriverId).subscribe(() => {
      this.cargo = null;
    });
  }

  deliver() {
    if (this.hardCodedDriverId !== this.cargo.driver.id) {
      return;
    }

    this.cargoService.setDeliverStatus(this.cargo.id, this.hardCodedDriverId).subscribe(data => {
      this.cargo = null;
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
