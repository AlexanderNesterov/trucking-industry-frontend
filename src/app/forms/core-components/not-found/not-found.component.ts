import {Component} from '@angular/core';
import {PermissionService} from '../../../services/permision.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {

  constructor(private permissionService: PermissionService, private router: Router) {
  }

  toHomepage() {
    this.router.navigate(['/homepage']);
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  checkRole(role: string): boolean {
    return this.permissionService.check(role);
  }
}
