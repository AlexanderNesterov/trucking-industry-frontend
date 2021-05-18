import {Driver} from './driver';
import {Truck} from './truck';
import {Cargo} from './cargo';
import {City} from './city';

export interface Order {
  id?: number;
  driver: Driver;
  coDriver: Driver;
  truck: Truck;
  totalWeight: number;
  cargoList: Cargo[];
  status?: string;
  theBestWay?: City[];
}
