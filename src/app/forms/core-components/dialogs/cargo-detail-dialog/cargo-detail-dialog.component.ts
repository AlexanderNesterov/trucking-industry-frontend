import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Order} from '../../../../models/order';

@Component({
  selector: 'app-cargo-detail-dialog',
  templateUrl: './cargo-detail-dialog.component.html',
  styleUrls: ['./cargo-detail-dialog.component.css']
})
export class CargoDetailDialogComponent {

  order: Order;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.order = this.data.order;
  }
}
