import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Truck} from '../../models/truck';
import {TruckService} from '../../services/truck.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {

  trucks: Truck[];
  displayedColumns: string[] = ['id', 'registrationNumber', 'model', 'capacity', 'condition'];

  constructor(private truckService: TruckService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.truckService.findAll().subscribe((data: Truck[]) => {
      this.trucks = data;
      console.log(this.trucks);
    });
  }

}
