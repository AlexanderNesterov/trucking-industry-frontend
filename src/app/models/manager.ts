import {User} from './user';

export interface Manager {
  id?: number;
  user: User;
  status?: string;
}
