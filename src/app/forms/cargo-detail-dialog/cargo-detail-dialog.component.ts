import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Driver} from '../../models/driver';
import {Truck} from '../../models/truck';

@Component({
  selector: 'app-cargo-detail-dialog',
  templateUrl: './cargo-detail-dialog.component.html',
  styleUrls: ['./cargo-detail-dialog.component.css']
})
export class CargoDetailDialogComponent implements OnInit {

  driver: Driver;
  coDriver: Driver;
  truck: Truck;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.driver = this.data.cargo.driver;
    this.coDriver = this.data.cargo.coDriver;
    this.truck = this.data.cargo.truck;

    console.log(this.driver);
  }

  ngOnInit() {
  }

}
