import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../models/user';
import {ManagerService} from '../../services/manager.service';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit, OnDestroy {

  managers: User[];
  displayedColumns: string[] = ['id', 'Name', 'Phone', 'Email'];
  subscription: Subscription;

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.subscription = this.managerService.findAll().subscribe((data) => {
      this.managers = data;
      console.log(this.managers);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
