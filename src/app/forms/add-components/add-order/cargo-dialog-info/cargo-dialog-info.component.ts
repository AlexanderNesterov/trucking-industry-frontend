import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../../../models/city';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Cargo} from '../../../../models/cargo';
import {LatLngBoundsLiteral} from '@agm/core';

@Component({
  selector: 'app-cargo-dialog-info',
  templateUrl: './cargo-dialog-info.component.html',
  styleUrls: ['./cargo-dialog-info.component.css']
})
export class CargoDialogInfoComponent implements OnInit {

  cities: City[];
  updatingCargo: Cargo;
  loadLoc: City;
  dischargeLoc: City;
  filteredLoadCities: Observable<City[]>;
  filteredDischargeCities: Observable<City[]>;
  dischargeFormControl = new FormControl();
  loadFormControl = new FormControl();
  isEqualsCities = false;
  bounds: LatLngBoundsLiteral;

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

  citiesFormControl = new FormControl('', [
    Validators.requiredTrue
  ]);

  firstFormGroup = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    weight: this.weightFormControl
  });
  secondFormGroup = new FormGroup({
    cities: this.citiesFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CargoDialogInfoComponent>) {
    this.cities = data.cities;
    this.updatingCargo = data.updatingCargo;
  }

  ngOnInit() {
    this.filteredLoadCities = this.loadFormControl.valueChanges
      .pipe(
        // startWith(''),
        tap(() => {
          this.loadLoc = undefined;
          this.checkCities();
        }),
        map(value => this._loadFilter(value))
      );
    this.filteredDischargeCities = this.dischargeFormControl.valueChanges
      .pipe(
        // startWith(''),
        tap(() => {
          this.dischargeLoc = undefined;
          this.checkCities();
        }),
        map(value => this._dischargeFilter(value))
      );

    if (this.updatingCargo !== null) {
      this.putDataInFormGroups();
    }
  }

  putDataInFormGroups() {
    this.firstFormGroup.patchValue({title: this.updatingCargo.title});
    this.firstFormGroup.patchValue({description: this.updatingCargo.description});
    this.firstFormGroup.patchValue({weight: this.updatingCargo.weight});
    this.loadFormControl.patchValue(this.updatingCargo.loadLocation.name + ', ' +
      this.updatingCargo.loadLocation.country);
    this.dischargeFormControl.patchValue(this.updatingCargo.dischargeLocation.name + ', ' +
      this.updatingCargo.dischargeLocation.country);

    this.loadLoc = this.updatingCargo.loadLocation;
    this.dischargeLoc = this.updatingCargo.dischargeLocation;

    this.calculateBounds();
    this.secondFormGroup.patchValue({cities: true});
  }

  private _loadFilter(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => (option.name.toLowerCase() + ', ' + option.country.toLowerCase()).includes(filterValue));
  }

  private _dischargeFilter(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => (option.name.toLowerCase() + ', ' + option.country.toLowerCase()).includes(filterValue));
  }

  chooseLoadLocation(city: City) {
    this.loadLoc = city;
    this.checkCities();
  }

  chooseDischargeLocation(city: City) {
    this.dischargeLoc = city;
    this.checkCities();
  }

  checkCities() {
    if (this.dischargeLoc === undefined || this.loadLoc === undefined) {
      this.secondFormGroup.patchValue({cities: false});
      return;
    }

    this.calculateBounds();

    this.isEqualsCities = this.loadLoc === this.dischargeLoc;
    this.secondFormGroup.patchValue({cities: !this.isEqualsCities});
  }

  calculateBounds() {
    const mostEast = (this.loadLoc.longitude > this.dischargeLoc.longitude) ? this.loadLoc.longitude : this.dischargeLoc.longitude;
    const mostWest = (this.loadLoc.longitude < this.dischargeLoc.longitude) ? this.loadLoc.longitude : this.dischargeLoc.longitude;
    const mostNorth = (this.loadLoc.latitude > this.dischargeLoc.latitude) ? this.loadLoc.latitude : this.dischargeLoc.latitude;
    const mostSouth = (this.loadLoc.latitude < this.dischargeLoc.latitude) ? this.loadLoc.latitude : this.dischargeLoc.latitude;

    this.bounds = {
      east: mostEast,
      west: mostWest,
      north: mostNorth,
      south: mostSouth
    };
  }

  add() {
    const cargo = {
      title: this.firstFormGroup.controls.title.value,
      description: this.firstFormGroup.controls.description.value,
      weight: this.firstFormGroup.controls.weight.value,
      loadLocation: this.loadLoc,
      dischargeLocation: this.dischargeLoc,
    };

    this.dialogRef.close(cargo);
  }
}
