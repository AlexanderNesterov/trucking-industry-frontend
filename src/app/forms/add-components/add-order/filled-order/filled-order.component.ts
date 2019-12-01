import {Component, Input} from '@angular/core';
import {Order} from '../../../../models/order';

@Component({
  selector: 'app-filled-order',
  templateUrl: './filled-order.component.html',
  styleUrls: ['./filled-order.component.css']
})
export class FilledOrderComponent {

  @Input()
  order: Order;

  constructor() {
  }

}
