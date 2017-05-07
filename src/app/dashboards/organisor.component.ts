import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl:'./organisor.component.html',
  styleUrls:['organisor.component.css']
})

export class OrganisorDashboardComponent implements OnInit {
 
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
   
  }

}
