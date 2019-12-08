import {UserService} from '../../services/user.service';
import {FormControl} from '@angular/forms';
import {timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DriverService} from '../../services/driver.service';
import {TruckService} from '../../services/truck.service';

export const loginAsyncValidator =
  (userService: UserService, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => userService.isLoginExists(input.value)),
        map(res => {
          return res ? null : {loginExist: true};
        })
      );
    };
  };

export const driverLicenseAsyncValidator =
  (driverService: DriverService, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => driverService.isDriverLicenseExist(input.value)),
        map(res => {
          return res ? null : {driverLicenseExist: true};
        })
      );
    };
  };

export const registrationNumberAsyncValidator =
  (truckService: TruckService, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => truckService.isRegistrationNumberExist(input.value)),
        map(res => {
          return res ? null : {registrationNumberExist: true};
        })
      );
    };
  };
