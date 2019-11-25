import {Component, DoCheck, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  title = 'Trucking Industry';
  login: string;

  constructor(private router: Router) {

  }

  ngDoCheck(): void {
    this.login = localStorage.getItem('login');
  }

  checkRole(role: string) {
    const loc = localStorage.getItem('role');
    return loc === role;
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
