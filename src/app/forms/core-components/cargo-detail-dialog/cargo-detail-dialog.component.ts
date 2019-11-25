import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Cargo} from '../../../models/cargo';

@Component({
  selector: 'app-cargo-detail-dialog',
  templateUrl: './cargo-detail-dialog.component.html',
  styleUrls: ['./cargo-detail-dialog.component.css']
})
export class CargoDetailDialogComponent {

  cargo: Cargo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargo = this.data.cargo;
    console.log(this.cargo);
  }
}
