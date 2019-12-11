import {Component, OnDestroy, OnInit} from '@angular/core';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit, OnDestroy {

  trucks: Truck[];
  displayedColumns: string[] = ['id', 'registrationNumber', 'model', 'capacity', 'condition', 'action'];
  subscription: Subscription;
  textSearch = '';
  canUpdate = false;
  page = 1;
  size = 10;

  constructor(private truckService: TruckService, private router: Router) {
  }

  ngOnInit() {
    this.findAllTrucks();
  }

  findAllTrucks() {
    this.getTrucks();
  }

  getTrucks() {
    this.subscription = this.truckService.getTrucks(this.textSearch, this.page, this.size).subscribe((data: Truck[]) => {
      this.trucks = data;
    });
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

  checkToUpdate(id: number) {
    this.canUpdate = false;
    this.truckService.canUpdateTruck(id).subscribe(res => {
      this.canUpdate = res;
    });
  }

  setBroken(id: number) {
    this.truckService.setBrokenCondition(id).subscribe(res => {
      this.getTrucks();
    });
  }

  setServiceable(id: number) {
    this.truckService.setServiceableCondition(id).subscribe(res => {
      this.getTrucks();
    });
  }
}
