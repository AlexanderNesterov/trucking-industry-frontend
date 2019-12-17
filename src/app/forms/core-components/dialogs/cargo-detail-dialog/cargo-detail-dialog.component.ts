import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Order} from '../../../../models/order';
import {CargoService} from '../../../../services/cargo.service';

@Component({
  selector: 'app-cargo-detail-dialog',
  templateUrl: './cargo-detail-dialog.component.html',
  styleUrls: ['./cargo-detail-dialog.component.css']
})
export class CargoDetailDialogComponent {

  order: Order = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cargoService: CargoService) {
    this.cargoService.getCargoListByOrderId(data.order.id).subscribe(res => {
      this.order = this.data.order;
      this.order.cargoList = res;
    });
  }
}
