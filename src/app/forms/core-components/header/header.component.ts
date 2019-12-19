import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {PermissionService} from '../../../services/permision.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  title = 'Trucking Industry';
  login: string;

  constructor(private router: Router, private permissionService: PermissionService) {
  }

  ngDoCheck(): void {
    this.login = localStorage.getItem('login');
  }

  checkRole(role: string): boolean {
    return this.permissionService.check(role);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  showLogout() {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }
}
