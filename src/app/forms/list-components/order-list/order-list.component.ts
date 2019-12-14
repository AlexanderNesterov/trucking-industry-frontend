import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CargoDetailDialogComponent} from '../../core-components/dialogs/cargo-detail-dialog/cargo-detail-dialog.component';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orderList: Order[];
  displayedColumns: string[] = ['id', 'drivers', 'truck', 'totalWeight', 'status', 'action'];
  subscription: Subscription;
  textSearch = '';
  page = 1;
  size = 10;

  constructor(private orderService: OrderService, private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.findAllCargo();
  }

  findAllCargo() {
    this.getOrders();
  }

  getOrders() {
    this.subscription = this.orderService.getOrders(this.textSearch, this.page, this.size).subscribe((data: Order[]) => {
      this.orderList = data;
    });
  }

  doSearch(text: string) {
    this.orderList = undefined;
    this.textSearch = text;
    this.page = 1;

    this.getOrders();
  }

  pageChange(page: number) {
    this.page = page;
    this.getOrders();
  }

  sizeChange(size: number) {
    this.size = size;
    this.getOrders();
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
    this.router.navigate(['/update-order'], {queryParams: {id}});
  }

  cancel(id: number) {
    this.openConfirmationDialog().afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.orderService.setCancelStatus(id).subscribe(res => {
        if (res) {
          this.getOrders();
        }
      });
    });
  }

  openConfirmationDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'cancel the order'
      }, width: '17%', height: '19%'
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
