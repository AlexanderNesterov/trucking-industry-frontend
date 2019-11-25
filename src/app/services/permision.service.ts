import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() {
  }

  watch(permittedRole: string): boolean {
    const role = localStorage.getItem('role');
    console.log(role, permittedRole);
    return role === permittedRole;
  }
}
