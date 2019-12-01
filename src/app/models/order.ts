import {Driver} from './driver';
import {Truck} from './truck';
import {Cargo} from './cargo';

export interface Order {
  id?: number;
  driver: Driver;
  coDriver: Driver;
  truck: Truck;
  totalWeight: number;
  cargoList: Cargo[];
}
