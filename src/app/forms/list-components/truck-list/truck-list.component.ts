import {Component, OnDestroy, OnInit} from '@angular/core';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit, OnDestroy {

  trucks: Truck[];
  displayedColumns: string[] = ['id', 'registrationNumber', 'model', 'capacity', 'condition', 'action'];
  subscription: Subscription;

  filterControl = new FormControl();
  filterGroup = new FormGroup({
    filter: this.filterControl
  });

  constructor(private truckService: TruckService, private router: Router) {
  }

  ngOnInit() {
    this.searchTrucks()
    this.subscription = this.truckService.findAll().subscribe((data: Truck[]) => {
      this.trucks = data;
      console.log(this.trucks);
    });
  }

  searchTrucks() {
    this.filterControl.valueChanges.pipe(
      debounceTime(1500),
      switchMap(text => {
        this.trucks = undefined;

        if (text !== '') {
          return this.truckService.getTrucksBySearch((text as string).toLowerCase());
        }

        return this.truckService.findAll();
      })
    ).subscribe(res => {
      console.log(res);
      this.trucks = res;
    });
  }

  addNewTruck() {
    this.router.navigate(['/add-truck']);
  }

  updateTruck(id: any) {
    this.router.navigate(['/update-truck'], {queryParams: {id}});
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
