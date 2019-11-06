import {Truck} from './truck';
import {Driver} from './driver';

export interface Cargo {
  id?: number;
  title: string;
  description?: string;
  weight: number;
  status?: string;
  loadLocation?: string;
  dischargeLocation?: string;
  truckDto: Truck;
  driverDto: Driver;
  coDriverDto: Driver;
}
