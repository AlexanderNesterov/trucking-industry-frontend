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
  page = 1;
  size = 10;

  filterControl = new FormControl();
  filterGroup = new FormGroup({
    filter: this.filterControl
  });

  constructor(private truckService: TruckService, private router: Router) {
  }

  ngOnInit() {
    this.searchTrucks();
    this.findAllTrucks();
  }

  searchTrucks() {
    this.filterControl.valueChanges.pipe(
      debounceTime(1500),
      switchMap(text => {
        this.trucks = undefined;

        if (text !== '') {
          return this.truckService.getTrucksBySearch((text as string).toLowerCase());
        }

        return this.truckService.findAll(this.page, this.size);
      })
    ).subscribe(res => {
      console.log(res);
      this.trucks = res;
    });
  }

  findAllTrucks() {
    this.subscription = this.truckService.findAll(this.page, this.size).subscribe((data: Truck[]) => {
      this.trucks = data;
    });
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllTrucks();
  }

  sizeChange(size: number) {
    this.size = size;
    this.findAllTrucks();
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
