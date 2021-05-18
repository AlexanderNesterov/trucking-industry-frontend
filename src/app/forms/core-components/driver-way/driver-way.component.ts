import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-city-bottom-sheet',
  templateUrl: './driver-way.component.html',
  styleUrls: ['./driver-way.component.css']
})
export class DriverWayComponent {
  order: Order;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Order) {
    this.order = data;
  }
}
