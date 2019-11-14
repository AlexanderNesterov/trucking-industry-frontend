import {User} from './user';

export interface Driver {
  id?: number;
  driverLicense?: string;
  status?: string;
  user?: User;
}
