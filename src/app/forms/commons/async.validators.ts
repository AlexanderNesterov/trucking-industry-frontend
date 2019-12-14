import {UserService} from '../../services/user.service';
import {FormControl} from '@angular/forms';
import {timer} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {DriverService} from '../../services/driver.service';
import {TruckService} from '../../services/truck.service';

export const loginAsyncValidator =
  (userService: UserService, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => userService.isLoginExists(input.value)),
        map(res => {
          return res ? {loginExist: true} : null ;
        })
      );
    };
  };

export const driverLicenseAsyncValidator =
  (driverService: DriverService, driverId: number, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        tap(() => console.log(driverId)),
        switchMap(() => driverService.isDriverLicenseExist(input.value, driverId)),
        map(res => {
          return res ? null : {driverLicenseExist: true};
        })
      );
    };
  };

export const registrationNumberAsyncValidator =
  (truckService: TruckService, truckId, time: number = 1000) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => truckService.isRegistrationNumberExist(input.value, truckId)),
        map(res => {
          return res ? null : {registrationNumberExist: true};
        })
      );
    };
  };
