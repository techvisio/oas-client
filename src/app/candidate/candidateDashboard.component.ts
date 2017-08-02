import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './candidateDashboard.component.html',
 styleUrls: ['./candidateDashboard.component.css']
})

export class CandidateDashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

  }

}
