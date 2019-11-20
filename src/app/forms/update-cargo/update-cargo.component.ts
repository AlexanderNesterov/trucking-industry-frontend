import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';
import {Cargo} from '../../models/cargo';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DriverService} from '../../services/driver.service';
import {CargoService} from '../../services/cargo.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-cargo',
  templateUrl: './update-cargo-two.component.html',
  styleUrls: ['./update-cargo.component.css']
})
export class UpdateCargoComponent implements OnInit, OnDestroy {

  cargo: Cargo;
  // @ts-ignore
  trucks: MatTableDataSource;
  // @ts-ignore
  drivers: MatTableDataSource;
  truckSelection = new SelectionModel<Truck>();
  driversSelection = new SelectionModel(true);
  cargoId: number;
  isReady = false;
  isCreated = false;
  truckSubscription: Subscription;
  driverSubscription: Subscription;
  cargoSubscription: Subscription;

  truckDisplayedColumns: string[] = ['id', 'model', 'registrationNumber', 'capacity', 'select'];
  driverDisplayedColumns: string[] = ['id', 'name', 'driverLicense', 'select'];

  titleFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.max(256)
  ]);

  weightFormControl = new FormControl('', [
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
  firstFormDisable = false;
  secondFormDisable = false;
  thirdFormDisable = false;

  constructor(private truckService: TruckService, private driverService: DriverService,
              private cargoService: CargoService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe(param => {
      this.cargoId = param.id;

      this.cargoService.findById(this.cargoId).subscribe(data => {
        this.firstFormGroup.patchValue({
          title: data.title,
          description: data.description,
          weight: data.weight
        });
      });
    });

    subscription.unsubscribe();
  }

  getTrucks() {
    this.truckSubscription = this.truckService.getFreeTrucks(this.firstFormGroup.controls.weight.value).subscribe(data => {
      this.trucks = new MatTableDataSource(data);
      console.log('Trucks: ', this.trucks);
    });
  }

  getDrivers() {
    this.driverSubscription = this.driverService.getFreeDrivers().subscribe(data => {
      this.drivers = new MatTableDataSource(data);
      console.log('Drivers: ', this.drivers);
    });
  }

  setInfo() {
    this.cargo = {
      id: this.cargoId,
      title: this.firstFormGroup.controls.title.value,
      description: this.firstFormGroup.controls.description.value,
      weight: this.firstFormGroup.controls.weight.value
    };

    this.firstFormDisable = true;
  }

  setTruck() {
    this.cargo.truck = this.truckSelection.selected[0];
    this.secondFormDisable = true;
  }

  setDrivers() {
    this.cargo.driver = this.driversSelection.selected[0];
    this.cargo.coDriver = this.driversSelection.selected[1];
    this.isReady = true;
    this.thirdFormDisable = true;
  }

  /*  setCargo() {
      this.cargo = {
        title: this.firstFormGroup.controls.title.value,
        description: this.firstFormGroup.controls.description.value,
        weight: this.firstFormGroup.controls.weight.value,
        truck: this.truckSelection.selected[0],
        driver: this.driversSelection.selected[0] as Driver,
        coDriver: this.driversSelection.selected[1] as Driver
      };
    }*/

  confirm() {
    this.cargoSubscription = this.cargoService.updateCargo(this.cargo).subscribe(data => {
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.thirdFormGroup.reset();
      this.isCreated = data;
    });
  }

  check() {
    this.thirdFormGroup.patchValue({driversCtrl: this.driversSelection.selected.length});
  }

  ngOnDestroy(): void {
    if (this.truckSubscription !== undefined) {
      this.truckSubscription.unsubscribe();
    }

    if (this.driverSubscription !== undefined) {
      this.driverSubscription.unsubscribe();
    }

    if (this.cargoSubscription !== undefined) {
      this.cargoSubscription.unsubscribe();
    }
  }
}

