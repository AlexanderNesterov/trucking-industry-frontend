import {City} from './city';

export interface Cargo {
  id?: number;
  title: string;
  description?: string;
  weight: number;
  loadLocation?: City;
  dischargeLocation?: City;
  status?: string;
}
