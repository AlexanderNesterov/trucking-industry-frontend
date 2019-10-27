import { Component, OnInit } from '@angular/core';
import {Driver} from '../../models/driver';
import {DriverService} from '../../services/driver-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  drivers: Driver[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'status'];

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.driverService.findAll().subscribe((data: Driver[]) => {
      this.drivers = data;
      console.log(this.drivers);
    });
  }

}
