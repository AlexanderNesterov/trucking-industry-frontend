import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cargo} from '../../models/cargo';
import {CargoService} from '../../services/cargo.service';
import {MatDialog} from '@angular/material';
import {CargoDetailDialogComponent} from '../cargo-detail-dialog/cargo-detail-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit, OnDestroy {

  cargos: Cargo[];
  displayedColumns: string[] = ['id', 'title', 'weight', 'loadLocation', 'dischargeLocation', 'status', 'info'];
  subscription: Subscription;

  constructor(private truckService: CargoService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.truckService.findAll().subscribe((data: Cargo[]) => {
      this.cargos = data;
      console.log(this.cargos);
    });
  }

  openDialog(selectedCargo: Cargo) {
    this.dialog.open(CargoDetailDialogComponent, {
      data: {
        cargo: selectedCargo
      }, width: '70%'
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
