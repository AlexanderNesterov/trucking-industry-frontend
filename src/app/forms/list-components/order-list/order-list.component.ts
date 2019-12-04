import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {MatDialog} from '@angular/material';
import {CargoDetailDialogComponent} from '../../core-components/dialogs/cargo-detail-dialog/cargo-detail-dialog.component';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orderList: Order[];
  displayedColumns: string[] = ['id', 'drivers', 'truck', 'totalWeight', 'status', 'action'];
  subscription: Subscription;
  page = 1;
  size = 10;

  filterControl = new FormControl();
  filterGroup = new FormGroup({
    filter: this.filterControl
  });

  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.searchOrders();
    this.findAllCargo();
  }

  findAllCargo() {
    this.subscription = this.orderService.findAll(this.page, this.size).subscribe((data: Order[]) => {
      this.orderList = data;
    });
  }

  searchOrders() {
    this.filterControl.valueChanges.pipe(
      debounceTime(1500),
      switchMap(text => {
        this.orderList = undefined;

        if (text !== '') {
          return this.orderService.getOrdersBySearch((text as string).toLowerCase());
        }

        return this.orderService.findAll(this.page, this.size);
      })
    ).subscribe(res => {
      console.log(res);
      this.orderList = res;
    });
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllCargo();
  }

  sizeChange(size: number) {
    this.size = size;
    this.findAllCargo();
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
