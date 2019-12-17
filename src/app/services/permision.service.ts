import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() {
  }

  check(permittedRole: string): boolean {
    const role = localStorage.getItem('role');
    return role === permittedRole;
  }

  getLogin() {
    return localStorage.getItem('login');
  }

  getManagerId() {
    return parseInt(localStorage.getItem('managerId'), 10);
  }
}
