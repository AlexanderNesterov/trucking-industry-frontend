import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  filterControl = new FormControl();

  @Output()
  onFilterInput = new EventEmitter<string>();

  constructor() {
    this.filterControl.valueChanges.pipe(
      debounceTime(1500),
    ).subscribe((res: string) => {
      this.onFilterInput.emit(res.toLowerCase());
    });
  }
}
