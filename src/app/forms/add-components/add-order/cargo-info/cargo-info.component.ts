import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Cargo} from '../../../../models/cargo';

@Component({
  selector: 'app-cargo-info',
  templateUrl: './cargo-info.component.html',
  styleUrls: ['./cargo-info.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoInfoComponent {

  @Input()
  cargo: Cargo;

  constructor() { }

}
