import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cargo} from '../../models/cargo';
import {CargoService} from '../../services/cargo.service';
import {MatDialog} from '@angular/material';
import {CargoDetailDialogComponent} from '../cargo-detail-dialog/cargo-detail-dialog.component';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit {

  cargos: Cargo[];
  displayedColumns: string[] = ['id', 'title', 'weight', 'loadLocation', 'dischargeLocation', 'info'];

  constructor(private truckService: CargoService, private route: ActivatedRoute,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.truckService.findAll().subscribe((data: Cargo[]) => {
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
}
