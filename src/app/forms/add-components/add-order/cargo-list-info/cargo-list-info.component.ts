import {Component, EventEmitter, Output} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {CityService} from '../../../../services/city.service';
import {City} from '../../../../models/city';
import {MatDialog} from '@angular/material';
import {CargoDialogInfoComponent} from '../cargo-dialog-info/cargo-dialog-info.component';

@Component({
  selector: 'app-cargo-list-info',
  templateUrl: './cargo-list-info.component.html',
  styleUrls: ['./cargo-list-info.component.css']
})
export class CargoListInfoComponent {

  @Output()
  onValidFirstGroup = new EventEmitter<Cargo[]>();

  cargoList: Cargo[] = [];
  cities: City[];
  totalWeight = 0;

  constructor(private cityService: CityService, private dialog: MatDialog) {
    this.cityService.findAll().subscribe(res => {
      this.cities = res;
      console.log(this.cities);
    });
  }

  create() {
    if (this.cargoList.length < 5) {
      this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(CargoDialogInfoComponent, {
      data: {
        cities: this.cities
      }, width: '70%'
    }).afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.cargoList.push(res);
        this.totalWeight += res.weight;
      }
    });
  }

  next() {
    this.onValidFirstGroup.emit(this.cargoList);
  }
}
