import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatBottomSheet, MatDialog, MatDialogRef} from '@angular/material';
import {CityService} from '../../../services/city.service';
import {City} from '../../../models/city';
import {CityBottomSheetComponent} from './city-bottom-sheet/city-bottom-sheet.component';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnDestroy {

  cities: City[];
  addingCity: City;
  displayedColumns: string[] = ['name', 'country', 'action'];
  citySubscription: Subscription;
  dialogSubscription: Subscription;
  isEmptyList = false;
  isCreated = false;
  errorMessage = '';

  cityFormControl = new FormControl('', Validators.required);

  cityFormGroup = new FormGroup({
    city: this.cityFormControl
  });

  constructor(private cityService: CityService, private bottomSheet: MatBottomSheet,
              private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    if (this.citySubscription !== undefined) {
      this.citySubscription.unsubscribe();
    }

    if (this.dialogSubscription !== undefined) {
      this.dialogSubscription.unsubscribe();
    }
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
  }

  onSearch() {
    this.cities = undefined;
    this.errorMessage = '';

    this.citySubscription = this.cityService.getCityFromApi(this.cityFormGroup.controls.city.value).subscribe(res => {
      this.cities = res.data;
      this.isEmptyList = this.cities.length === 0;
    }, error => {
      if (error.statusText === 'Unknown Error') {
        this.errorMessage = 'Sorry, service unavailable';
      }
    });
  }

  onAdd(city: any) {
    this.dialogSubscription = this.openDialog().afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.errorMessage = '';
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
    });
  }

  openDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'add new city'
      }, width: '17%', height: '19%'
    });
  }
}
