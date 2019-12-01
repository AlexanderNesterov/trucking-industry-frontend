import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../../../models/city';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-cargo-dialog-info',
  templateUrl: './cargo-dialog-info.component.html',
  styleUrls: ['./cargo-dialog-info.component.css']
})
export class CargoDialogInfoComponent {

  cities: City[];
  loadLocation: City;
  dischargeLocation: City;

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
  }

  chooseLoadLocation(city: City) {
    this.loadLocation = city;
    this.checkCities();
  }

  chooseDischargeLocation(city: City) {
    this.dischargeLocation = city;
    this.checkCities();
  }

  checkCities() {
    if (this.dischargeLocation === undefined || this.loadLocation === undefined) {
      this.secondFormGroup.patchValue({cities: false});
      return;
    }

    const equals = this.loadLocation !== this.dischargeLocation;
    this.secondFormGroup.patchValue({cities: equals});
  }

  add() {
    const cargo = {
      title: this.firstFormGroup.controls.title.value,
      description: this.firstFormGroup.controls.description.value,
      weight: this.firstFormGroup.controls.weight.value,
      loadLocation: this.loadLocation,
      dischargeLocation: this.dischargeLocation,
    };

    this.dialogRef.close(cargo);
  }
}
