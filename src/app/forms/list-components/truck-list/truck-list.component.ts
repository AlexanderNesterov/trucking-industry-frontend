import {Component, OnDestroy, OnInit} from '@angular/core';
import {Truck} from '../../../models/truck';
import {TruckService} from '../../../services/truck.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../core-components/dialogs/confirmation-dialog/confirmation-dialog.component';

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

  constructor(private truckService: TruckService, private router: Router,
              private dialog: MatDialog) {
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

  checkToUpdate(id: number) {
    this.canUpdate = false;
    this.truckService.canUpdateTruck(id).subscribe(res => {
      this.canUpdate = res;
    });
  }

  setBroken(id: number) {
    this.openDialog('set broken status').afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.truckService.setBrokenCondition(id).subscribe(() => {
        this.getTrucks();
      });
    });
  }

  setServiceable(id: number) {
    this.openDialog('set serviceable status').afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.truckService.setServiceableCondition(id).subscribe(() => {
        this.getTrucks();
      });
    });
  }

  openDialog(message: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message
      }, width: '17%', height: '19%'
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
