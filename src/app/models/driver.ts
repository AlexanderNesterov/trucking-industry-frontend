export class Driver {
  id: number;
  firstName: string;
  lastName: string;
  driverLicense: string;
  hoursPerMonth: string;
  status: string;

  constructor(id: number, firstName: string, lastName: string,
              driverLicense: string, hoursPerMonth: string, status: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.driverLicense = driverLicense;
    this.hoursPerMonth = hoursPerMonth;
    this.status = status;
  }
}
