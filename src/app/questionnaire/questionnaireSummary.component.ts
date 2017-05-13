import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireSummaryDetail, QuestionnaireSummaryService }  from './questionnaireSummary.service';
import {sharedService} from '../common/shared.service';

@Component({
  templateUrl:'./questionnaireSummary.component.html',
  styleUrls:['./questionnaireSummary.component.css']
})

export class QuestionnaireSummaryComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  questionnaireSummaryData:QuestionnaireSummaryDetail =  new QuestionnaireSummaryDetail();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireSummaryService,
    private sharedService: sharedService
  ) {}

 ngOnInit() {
     this.route.params
     }

questionnaireSummary(){
    this.service.questionnaireSummary(this.questionnaireSummaryData).then(response => {
      if(response.status==='success'){
        this.router.navigate(['/organisor/home']);
      }
    });
  }

}
