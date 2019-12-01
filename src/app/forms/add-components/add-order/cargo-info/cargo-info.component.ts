import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {FitBoundsService} from '@agm/core/services/fit-bounds';
import {LatLngBounds, LatLngBoundsLiteral} from '@agm/core';

@Component({
  selector: 'app-cargo-info',
  templateUrl: './cargo-info.component.html',
  styleUrls: ['./cargo-info.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoInfoComponent {

  loadLocationLatitude: number;
  loadLocationLongitude: number;
  dischargeLocationLatitude: number;
  dischargeLocationLongitude: number;
  cargo: Cargo;

  constructor() { }

  @Input()
  set getCargo(cargo: Cargo) {
    this.loadLocationLatitude = cargo.loadLocation.latitude;
    this.loadLocationLongitude = cargo.loadLocation.longitude;
    this.dischargeLocationLatitude = cargo.dischargeLocation.latitude;
    this.dischargeLocationLongitude = cargo.dischargeLocation.longitude;
    this.cargo = cargo;
  }
}
