import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';
import {Cargo} from '../../models/cargo';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DriverService} from '../../services/driver.service';
import {CargoService} from '../../services/cargo.service';
import {Driver} from '../../models/driver';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent {

  cargo: Cargo;
  // @ts-ignore
  trucks: MatTableDataSource;
  // @ts-ignore
  drivers: MatTableDataSource;
  truckSelection = new SelectionModel<Truck>();
  driversSelection = new SelectionModel(true);

  truckDisplayedColumns: string[] = ['id', 'model', 'registrationNumber', 'capacity', 'select'];
  driverDisplayedColumns: string[] = ['id', 'firstName', 'lastName', 'driverLicense', 'select'];

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32)
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.max(256)
  ]);

  weightFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);

  truckFormControl = new FormControl('', [
    Validators.requiredTrue
  ]);

  driversFormControl = new FormControl(0, [
    Validators.min(2)
  ]);

  firstFormGroup = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    weight: this.weightFormControl
  });

  secondFormGroup = new FormGroup({
    truck: this.truckFormControl
  });

  thirdFormGroup = new FormGroup({
    driversCtrl: this.driversFormControl
  });

  constructor(private truckService: TruckService, private driverService: DriverService, private cargoService: CargoService) {
  }

  getTrucks() {
    this.truckService.getFreeTrucks(this.firstFormGroup.controls.weight.value).subscribe(data => {
      this.trucks = new MatTableDataSource(data);
      console.log('Trucks: ', this.trucks);
    });
  }

  getDrivers() {
    if (this.truckSelection.selected.length !== 0) {
      this.driverService.getFreeDrivers().subscribe(data => {
        this.drivers = new MatTableDataSource(data);
        console.log('Drivers: ', this.drivers);
      });
    }
  }

  applyTrucksFilter(filterValue: string) {
    this.trucks.filter = filterValue.trim().toLowerCase();
  }

  applyDriversFilter(filterValue: string) {
    this.drivers.filter = filterValue.trim().toLowerCase();
  }

  confirm() {
    this.cargoService.addCargo(this.cargo).subscribe();
  }

  setCargo() {
    console.log('TRUUUUUUUUUUUCK: ', this.truckSelection.selected);

    this.cargo = {
      title: this.firstFormGroup.controls.title.value,
      description: this.firstFormGroup.controls.description.value,
      weight: this.firstFormGroup.controls.weight.value,
      truck: this.truckSelection.selected[0],
      driver: this.driversSelection.selected.pop(),
      coDriver: this.driversSelection.selected.pop()
    };
  }

  check() {
    this.thirdFormGroup.patchValue({driversCtrl: this.driversSelection.selected.length});
  }
}
