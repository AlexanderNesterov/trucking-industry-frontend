import {Component, OnDestroy, OnInit} from '@angular/core';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit, OnDestroy {

  trucks: Truck[];
  displayedColumns: string[] = ['id', 'registrationNumber', 'model', 'capacity', 'condition'];
  subscription: Subscription;

  constructor(private truckService: TruckService) {
  }

  ngOnInit() {
    this.subscription = this.truckService.findAll().subscribe((data: Truck[]) => {
      this.trucks = data;
      console.log(this.trucks);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
