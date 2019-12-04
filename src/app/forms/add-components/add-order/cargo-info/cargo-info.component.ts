import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {FitBoundsService} from '@agm/core/services/fit-bounds';
import {LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import {PermissionService} from '../../../../services/permision.service';

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
  driverId: number;

  @Input()
  set setCargo(cargo: Cargo) {
    this.loadLocationLatitude = cargo.loadLocation.latitude;
    this.loadLocationLongitude = cargo.loadLocation.longitude;
    this.dischargeLocationLatitude = cargo.dischargeLocation.latitude;
    this.dischargeLocationLongitude = cargo.dischargeLocation.longitude;
    this.cargo = cargo;
  }

  @Input()
  set setDriverId(driverId: number) {
    this.driverId = driverId;
  }

  @Output()
  onDeliver = new EventEmitter<number>();

  constructor(private permissionService: PermissionService) {
  }

  checkPermission(): boolean {
    const savedDriverId = parseInt(localStorage.getItem('driverId'), 10);
    return this.permissionService.check('DRIVER')
      && this.driverId === savedDriverId
      && this.cargo.status === 'IN_PROGRESS';
  }

  deliver() {
    this.onDeliver.emit(this.cargo.id);
  }
}
