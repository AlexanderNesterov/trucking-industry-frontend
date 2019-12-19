import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Cargo} from '../../../../models/cargo';
import {PermissionService} from '../../../../services/permision.service';
import {City} from '../../../../models/city';
import {LatLngBoundsLiteral} from '@agm/core';

@Component({
  selector: 'app-cargo-info',
  templateUrl: './cargo-info.component.html',
  styleUrls: ['./cargo-info.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoInfoComponent {

  loadLoc: City;
  dischargeLoc: City;
  cargo: Cargo;
  isCreating = false;
  driverId: number;
  bounds: LatLngBoundsLiteral;

  @Output()
  onDeliver = new EventEmitter<number>();

  @Output()
  onRemove = new EventEmitter<Cargo>();

  @Output()
  onUpdate = new EventEmitter<Cargo>();

  constructor(private permissionService: PermissionService) {
  }

  @Input()
  set setCargo(cargo: Cargo) {
    this.loadLoc = cargo.loadLocation;
    this.dischargeLoc = cargo.dischargeLocation;
    this.cargo = cargo;
    this.calculateBounds();
  }

  @Input()
  set setDriverId(driverId: number) {
    this.driverId = driverId;
  }

  @Input()
  set setCreating(isCreating: boolean) {
    this.isCreating = isCreating;
  }

  checkPermissionForDeliver(): boolean {
    const savedDriverId = parseInt(localStorage.getItem('driverId'), 10);
    return this.permissionService.check('DRIVER')
      && this.driverId === savedDriverId
      && this.cargo.status === 'IN_PROGRESS';
  }

  checkPermissionForAdmin(): boolean {
    return this.permissionService.check('ADMIN');
  }

  calculateBounds() {
    const mostEast = (this.loadLoc.longitude > this.dischargeLoc.longitude) ? this.loadLoc.longitude : this.dischargeLoc.longitude;
    const mostWest = (this.loadLoc.longitude < this.dischargeLoc.longitude) ? this.loadLoc.longitude : this.dischargeLoc.longitude;
    const mostNorth = (this.loadLoc.latitude > this.dischargeLoc.latitude) ? this.loadLoc.latitude : this.dischargeLoc.latitude;
    const mostSouth = (this.loadLoc.latitude < this.dischargeLoc.latitude) ? this.loadLoc.latitude : this.dischargeLoc.latitude;

    this.bounds = {
      east: mostEast,
      west: mostWest,
      north: mostNorth,
      south: mostSouth
    };
  }

  deliver() {
    this.onDeliver.emit(this.cargo.id);
  }

  removeCargo() {
    this.onRemove.emit(this.cargo);
  }

  updateCargo() {
    this.onUpdate.emit(this.cargo);
  }
}
