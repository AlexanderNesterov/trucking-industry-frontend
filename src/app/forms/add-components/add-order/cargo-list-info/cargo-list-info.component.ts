import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {CityService} from '../../../../services/city.service';
import {City} from '../../../../models/city';
import {MatDialog} from '@angular/material';
import {CargoDialogInfoComponent} from '../cargo-dialog-info/cargo-dialog-info.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cargo-list-info',
  templateUrl: './cargo-list-info.component.html',
  styleUrls: ['./cargo-list-info.component.css']
})
export class CargoListInfoComponent implements OnDestroy{

  @Output()
  onValidFirstGroup = new EventEmitter<Cargo[]>();

  cargoList: Cargo[] = [];
  cities: City[];
  totalWeight = 0;
  cargoLimit = 5;
  subscription: Subscription;

  constructor(private cityService: CityService, private dialog: MatDialog) {
    this.subscription = this.cityService.findAll().subscribe(res => {
      this.cities = res;
    });
  }

  create() {
    if (this.cargoList.length < this.cargoLimit) {
      this.openDialog(null);
    }
  }

  openDialog(updatingCargo: Cargo) {
    this.dialog.open(CargoDialogInfoComponent, {
      data: {
        cities: this.cities,
        updatingCargo
      }, width: '53%'
    }).afterClosed().subscribe(res => {
      if (res !== undefined) {
        if (updatingCargo !== null) {
          this.removeCargo(updatingCargo);
        }

        this.cargoList.push(res);
        this.totalWeight += res.weight;
      }
    });
  }

  next() {
    this.onValidFirstGroup.emit(this.cargoList);
  }

  removeCargo(removingCargo: Cargo) {
    this.totalWeight -= removingCargo.weight;
    this.cargoList = this.cargoList.filter(cargo => cargo !== removingCargo);
  }

  updateCargo(updatingCargo: Cargo) {
    this.openDialog(updatingCargo);
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
