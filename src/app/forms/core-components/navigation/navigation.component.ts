import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  sizes: number[] = [5, 10, 15, 20, 25, 30];
  page = 1;
  size = this.sizes[1];
  subscription: Subscription;

  pageControl = new FormControl();

  @Output()
  onPageChange = new EventEmitter<number>();

  @Output()
  onSizeChange = new EventEmitter<number>();

  constructor() {
    this.subscription = this.pageControl.valueChanges.pipe(
      debounceTime(1000),
      tap(num => {
        console.log(num);
        if (num !== null && num > 0) {
          this.page = num;
        } else {
          this.page = 1;
        }
      })
    ).subscribe(res => {
      this.onPageChange.emit(this.page);
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.onPageChange.emit(this.page);
    }
  }

  nextPage() {
    this.page++;
    this.onPageChange.emit(this.page);
  }

  changeSize(size: number) {
    this.size = size;
    this.onSizeChange.emit(this.size);
  }
}
