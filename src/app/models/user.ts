export interface User {
  id?: number;
  login: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  role?: string;
}
