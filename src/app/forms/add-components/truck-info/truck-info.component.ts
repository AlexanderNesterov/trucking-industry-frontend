import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Truck} from '../../../models/truck';
import {SelectionModel} from '@angular/cdk/collections';
import {Subscription} from 'rxjs';
import {TruckService} from '../../../services/truck.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent {

  trucks: MatTableDataSource<Truck>;
  truckSubscription: Subscription;
  truckSelection = new SelectionModel<Truck>();

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
  set cargoWeight(cargoWeight: number) {
    if (cargoWeight === undefined) {
      console.log(cargoWeight);
      return;
    }

    this.truckSubscription = this.truckService.getFreeTrucks(cargoWeight).subscribe(data => {
      this.trucks = new MatTableDataSource(data);
      console.log('Trucks: ', this.trucks);
    });
  }

  next() {
    this.onValidSecondGroup.emit(this.truckSelection.selected[0]);
  }
}
