import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireDetail, QuestionnaireService }  from './questionnaire.service';
import {sharedService} from '../common/shared.service';

@Component({
  templateUrl:'./questionnaireSummary.component.html',
  styleUrls:['./questionnaireSummary.component.css']
})

export class QuestionnaireSummaryComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  questionnaireData:QuestionnaireDetail =  new QuestionnaireDetail();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) {}

 ngOnInit() {
     this.route.params
     }

saveQuestionnaire(){
    this.service.saveQuestionnaire(this.questionnaireData).then(response => {
      if(response.status==='success'){
        this.router.navigate(['question']);
      }
    });
  }

}