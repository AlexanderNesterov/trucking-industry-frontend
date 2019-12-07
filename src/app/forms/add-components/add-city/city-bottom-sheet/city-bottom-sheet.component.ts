import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-city-bottom-sheet',
  templateUrl: './city-bottom-sheet.component.html',
  styleUrls: ['./city-bottom-sheet.component.css']
})
export class CityBottomSheetComponent {

  latitude: number;
  longitude: number;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.latitude = data.city.latitude;
    this.longitude = data.city.longitude;
  }

}
