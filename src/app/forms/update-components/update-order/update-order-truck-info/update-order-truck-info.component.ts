import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../../../models/truck';
import {Subscription} from 'rxjs';
import {TruckService} from '../../../../services/truck.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-update-order-truck-info',
  templateUrl: './update-order-truck-info.component.html',
  styleUrls: ['./update-order-truck-info.component.css']
})
export class UpdateOrderTruckInfoComponent {

  trucks: MatTableDataSource<Truck>;
  truckSubscription: Subscription;
  selectedTruck: Truck;
  orderWeight: number;
  textSearch = '';
  page = 1;
  size = 10;

  @Output()
  onValidSecondGroup = new EventEmitter<Truck>();

  truckDisplayedColumns: string[] = ['id', 'model', 'registrationNumber', 'capacity', 'select'];

  truckFormControl = new FormControl('', [
    Validators.requiredTrue
  ]);

  secondFormGroup = new FormGroup({
    truck: this.truckFormControl
  });

  constructor(private truckService: TruckService) {
  }

  @Input()
  set cargoWeight(orderWeight: number) {
    if (orderWeight === 0) {
      return;
    }

    if (orderWeight > this.selectedTruck.capacity) {
      this.selectedTruck = undefined;
      this.truckFormControl.patchValue(false);
    }

    this.orderWeight = orderWeight;
    this.getTrucks();
  }

  private getTrucks() {
    this.truckSubscription = this.truckService
      .getFreeTrucks(this.orderWeight, this.textSearch, this.page, this.size).subscribe(data => {
        this.trucks = new MatTableDataSource(data);
      });
  }

  @Input()
  set setTruck(truck: Truck) {
    if (truck === undefined) {
      return;
    }

    this.selectedTruck = truck;
    this.truckFormControl.patchValue(true);
  }

  doSearch(text: string) {
    this.trucks = undefined;
    this.textSearch = text;
    this.page = 1;

    this.getTrucks();
  }

  pageChange(page: number) {
    this.page = page;
    this.getTrucks();
  }

  sizeChange(size: number) {
    this.size = size;
    this.getTrucks();
  }

  next() {
    this.onValidSecondGroup.emit(this.selectedTruck);
  }

  chooseTruck(truck: any) {
    this.selectedTruck = truck;
    this.secondFormGroup.patchValue({truck: true});
  }

  deleteTruck() {
    this.selectedTruck = undefined;
    this.secondFormGroup.patchValue({truck: false});
  }
}
