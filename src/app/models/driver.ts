export interface Driver {
  id?: number;
  driverLicense: string;
  status?: string;
  userDto: {
    id?: number;
    login: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    role?: string;
  };
}
