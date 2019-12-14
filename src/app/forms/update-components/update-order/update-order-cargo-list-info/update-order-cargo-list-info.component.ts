import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {CityService} from '../../../../services/city.service';
import {City} from '../../../../models/city';
import {MatDialog} from '@angular/material';
import {CargoDialogInfoComponent} from '../../../add-components/add-order/cargo-dialog-info/cargo-dialog-info.component';

@Component({
  selector: 'app-update-order-cargo-list-info',
  templateUrl: './update-order-cargo-list-info.component.html',
  styleUrls: ['./update-order-cargo-list-info.component.css']
})
export class UpdateOrderCargoListInfoComponent {

  @Output()
  onValidFirstGroup = new EventEmitter<Cargo[]>();

  cargoList: Cargo[] = [];
  cities: City[];
  totalWeight = 0;
  cargoLimit = 5;

  constructor(private cityService: CityService, private dialog: MatDialog) {
    this.cityService.findAll().subscribe(res => {
      this.cities = res;
      console.log(this.cities);
    });
  }

  @Input()
  set setCargoList(cargoList: Cargo[]) {
    if (cargoList !== undefined) {
      this.cargoList = cargoList;
      this.cargoList.map(cargo => this.totalWeight += cargo.weight);
    }
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
      }, width: '50%'
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
}
