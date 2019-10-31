import {Truck} from './truck';
import {Driver} from './driver';

export interface Cargo {
  id?: number;
  title: string;
  description?: string;
  weight: number;
  status?: number;
  loadLocation?: string;
  dischargeLocation?: string;
  truck: Truck;
  driver: Driver;
  coDriver: Driver;
}
