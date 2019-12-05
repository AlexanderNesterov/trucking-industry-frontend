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
  page = 1;
  size = 10;
  textSearch = '';

  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getManagers();
  }

  getManagers() {
    this.subscription = this.managerService.getManagers(this.textSearch, this.page, this.size).subscribe((data) => {
      this.managers = data;
    });
  }

  doSearch(text: string) {
    this.managers = undefined;
    this.textSearch = text;
    this.page = 1;

    this.getManagers();
  }

  pageChange(page: number) {
    this.page = page;
    this.getManagers();
  }

  sizeChange(size: number) {
    this.size = size;
    this.getManagers();
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
