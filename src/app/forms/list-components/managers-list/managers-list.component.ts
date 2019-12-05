import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ManagerService} from '../../../services/manager.service';
import {Router} from '@angular/router';
import {Manager} from '../../../models/manager';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit, OnDestroy {

  managers: Manager[];
  displayedColumns: string[] = ['id', 'name', 'contact', 'status'];
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
