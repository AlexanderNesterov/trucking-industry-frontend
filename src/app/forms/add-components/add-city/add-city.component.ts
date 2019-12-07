import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatBottomSheet} from '@angular/material';
import {CityService} from '../../../services/city.service';
import {City} from '../../../models/city';
import {CityBottomSheetComponent} from './city-bottom-sheet/city-bottom-sheet.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {

  cities: City[];
  addingCity: City;
  displayedColumns: string[] = ['name', 'country', 'action'];
  subscription: Subscription;
  isEmptyList = false;
  isCreated = false;
  errorMessage = '';

  cityFormControl = new FormControl('', Validators.required);

  cityFormGroup = new FormGroup({
    city: this.cityFormControl
  });

  constructor(private cityService: CityService, private bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(city: any): void {
    this.bottomSheet.open(CityBottomSheetComponent, {
      data: {city}
    });
  }

  putData(city: any) {
    this.addingCity = {
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude
    };

    console.log(this.addingCity);
  }

  onSearch() {
    this.cities = undefined;
    this.cityService.getCityFromApi(this.cityFormGroup.controls.city.value).subscribe(res => {
      console.log(res);
      this.cities = res.data;
      this.isEmptyList = this.cities.length === 0;
    });
  }

  onAdd(city: any) {
    this.putData(city);
    this.cityService.save(this.addingCity).subscribe(res => {
      if (res) {
        this.isCreated = true;
        setTimeout(() => {
          this.isCreated = false;
          this.addingCity = null;
        }, 3000);
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
