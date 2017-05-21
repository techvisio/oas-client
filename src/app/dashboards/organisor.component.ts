import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './organisor.component.html',
  styleUrls: ['organisor.component.css']
})

export class OrganisorDashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

  }

  sendToCreateQuestionnairePage() {
    const url = 'client/clientId/qnr/new';
    var newUrl = url;
    var clientId = this.sharedService.getCurrentUser().clientId;
    var newUrl = newUrl.replace(/clientId/i, clientId.toString());
    this.router.navigate([newUrl]);
  }
}
