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

  personalInformation: Driver;
  cargo: Cargo = undefined;
  hardCodedDriverId = 18;

  constructor(private driverService: DriverService, private cargoService: CargoService) {
  }

  ngOnInit() {
    this.driverService.findById(this.hardCodedDriverId).subscribe(data => {
      this.personalInformation = data;
      console.log(this.personalInformation);
    });

    this.cargoService.getCargoByDriverId(this.hardCodedDriverId).subscribe(data => {
      this.cargo = data;
      console.log(this.cargo);
    });
  }

  accept() {
    this.cargoService.setAcceptStatus(this.cargo.id, this.hardCodedDriverId).subscribe();
  }

  refuse() {
    this.cargoService.setRefuseStatus(this.cargo.id, this.hardCodedDriverId).subscribe();
  }
}
