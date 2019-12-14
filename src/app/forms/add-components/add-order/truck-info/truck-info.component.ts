import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../../../models/truck';
import {Subscription} from 'rxjs';
import {TruckService} from '../../../../services/truck.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnDestroy {

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
      console.log(orderWeight);
      return;
    }

    this.orderWeight = orderWeight;
    this.getTrucks();
  }

  getTrucks() {
    this.truckSubscription = this.truckSubscription = this.truckService
      .getFreeTrucks(this.orderWeight, this.textSearch, this.page, this.size).subscribe(data => {
        this.trucks = new MatTableDataSource(data);
      });
  }

  next() {
    this.onValidSecondGroup.emit(this.selectedTruck);
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

  chooseTruck(truck: any) {
    this.selectedTruck = truck;
    this.secondFormGroup.patchValue({truck: true});
  }

  deleteTruck() {
    this.selectedTruck = undefined;
    this.secondFormGroup.patchValue({truck: false});
  }

  ngOnDestroy(): void {
    if (this.truckSubscription !== undefined) {
      this.truckSubscription.unsubscribe();
    }
  }
}
