import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {Cargo} from '../../models/cargo';
import {CargoService} from '../../services/cargo.service';
import {Driver} from '../../models/driver';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  isCargoInProgress = false;
  personalInformation: Driver;
  cargo: Cargo = undefined;
  hardCodedDriverId = 1;

  constructor(private driverService: DriverService, private cargoService: CargoService) {
  }

  ngOnInit() {
    this.driverService.findById(this.hardCodedDriverId).subscribe(data => {
      this.personalInformation = data;
      this.getCargo();
      console.log(this.personalInformation);
    });
  }

  getCargo() {
    this.cargoService.getCargoByDriverId(this.hardCodedDriverId).subscribe(data => {
      this.cargo = data;

      if (this.cargo === null) {
        return;
      }

      if (this.cargo.status === 'IN_PROGRESS') {
        this.isCargoInProgress = true;
      }

      console.log(this.cargo);
    });
  }

  accept() {
    this.cargoService.setAcceptStatus(this.cargo.id, this.hardCodedDriverId).subscribe(() => {
      this.getCargo();
    });
  }

  refuse() {
    this.cargoService.setRefuseStatus(this.cargo.id, this.hardCodedDriverId).subscribe(() => {
      this.getCargo();
    });
  }

  deliver() {
    if (this.hardCodedDriverId !== this.cargo.driverDto.id) {
      return;
    }

    this.cargoService.setDeliverStatus(this.cargo.id, this.hardCodedDriverId).subscribe(data => {
      this.cargo = null;
    });
  }
}
