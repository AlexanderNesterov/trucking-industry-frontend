import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../../../models/order";
import {Subscription} from "rxjs";
import {OrderService} from "../../../services/order.service";
import {Router} from "@angular/router";
import {CargoDetailDialogComponent} from "../../core-components/dialogs/cargo-detail-dialog/cargo-detail-dialog.component";
import {ConfirmationDialogComponent} from "../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CargoService} from "../../../services/cargo.service";
import {LatLngBoundsLiteral} from "@agm/core";

@Component({
  selector: 'app-inprogress-tasks',
  templateUrl: './inprogress-tasks.component.html',
  styleUrls: ['./inprogress-tasks.component.css']
})
export class InprogressTasksComponent implements OnInit, OnDestroy {

  orderList: Order[];
  str = "hello";
  displayedColumns: string[] = ['id', 'drivers', 'truck', 'totalWeight', 'status', 'action'];
  subscription: Subscription;
  selectedOrder: Order;
  bounds: LatLngBoundsLiteral;
  // textSearch = '';
  // page = 1;
  // size = 10;

  constructor(private orderService: OrderService, private cargoService: CargoService, private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('+++++');
    this.findAllCargo();
  }

  findAllCargo() {
    this.getOrders();
  }

  getOrders() {
    console.log("====");
    this.subscription = this.orderService.getInProgressOrders().subscribe((data: Order[]) => {
      console.log(data);
      this.orderList = data;
    }, error => {
      console.log(error);
    });
  }

/*  doSearch(text: string) {
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
  }*/

  setCargo(order: Order) {
    this.cargoService.getCargoListByOrderId(order.id).subscribe(res => {
      this.selectedOrder = order;
      this.selectedOrder.cargoList = res;
      this.bounds = {
        east: this.selectedOrder.truck.longitude + 0.01,
        west: this.selectedOrder.truck.longitude - 0.01,
        north: this.selectedOrder.truck.latitude + 0.01,
        south: this.selectedOrder.truck.latitude - 0.01
      };
    })
  }

  openDialog(selectedOrder: Order) {
    this.dialog.open(CargoDetailDialogComponent, {
      data: {
        order: selectedOrder
      }, width: '70%'
    });
  }


/*  openConfirmationDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'cancel the order'
      }, width: '17%', height: '19%'
    });
  }*/

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
