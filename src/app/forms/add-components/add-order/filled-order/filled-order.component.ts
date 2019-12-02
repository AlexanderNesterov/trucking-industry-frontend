import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from '../../../../models/order';

@Component({
  selector: 'app-filled-order',
  templateUrl: './filled-order.component.html',
  styleUrls: ['./filled-order.component.css']
})
export class FilledOrderComponent {

  @Input()
  order: Order;

  @Output()
  onDeliver = new EventEmitter<number>();

  constructor() {
  }

  deliver(cargoId: number) {
    this.onDeliver.emit(cargoId);
  }
}
