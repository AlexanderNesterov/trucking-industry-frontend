import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../models/user';
import {ManagerService} from '../../services/manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit, OnDestroy {

  managers: User[];
  displayedColumns: string[] = ['id', 'name', 'contact'];
  subscription: Subscription;

  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.managerService.findAll().subscribe((data) => {
      this.managers = data;
      console.log(this.managers);
    });
  }

  addNewManager() {
    this.router.navigate(['/add-manager']);
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
