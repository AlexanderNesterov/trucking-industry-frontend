import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {MatDialog} from '@angular/material';
import {CargoDetailDialogComponent} from '../../core-components/dialogs/cargo-detail-dialog/cargo-detail-dialog.component';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orderList: Order[];
  displayedColumns: string[] = ['id', 'drivers', 'truck', 'totalWeight', 'status', 'action'];
  subscription: Subscription;

  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.orderService.findAll().subscribe((data: Order[]) => {
      this.orderList = data;
      console.log(this.orderList);
    });
  }

  addNewCargo() {
    this.router.navigate(['/add-order']);
  }

  openDialog(selectedOrder: Order) {
    this.dialog.open(CargoDetailDialogComponent, {
      data: {
        order: selectedOrder
      }, width: '70%'
    });
  }

  updateCargo(id: number) {
    this.router.navigate(['/update-cargo'], {queryParams: {id}});
  }

  cancel(id: number) {
    this.orderService.setCancelStatus(id).subscribe(res => {
      if (res) {
        this.orderList.find(cargo => cargo.id === id).status = 'CANCELED';
      }
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
