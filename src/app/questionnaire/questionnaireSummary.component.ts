import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuestionnaireDetail, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './questionnaireSummary.component.html',
  styleUrls: ['./questionnaireSummary.component.css']
})

export class QuestionnaireSummaryComponent implements OnInit {
  //  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  questionnaireData: QuestionnaireDetail = new QuestionnaireDetail();
  questionnaireSummaryForm: NgForm;
  subjects = [];
  @ViewChild('questionnaireSummaryForm') currentForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {
    this.route.params

    this.service.getMasterData('subject').then(response => {
      if (response.status === 'success') {
        this.subjects = response.data;
        console.log(this.subjects); 
           }
    });
  }


  saveQuestionnaire() {
    this.questionnaireData.clientId = this.sharedService.getCurrentUser().clientId;
    this.service.saveQuestionnaire(this.questionnaireData).then(response => {
      if (response.status === 'success') {
        const url = 'qnr/qnrId/question';
        var newUrl = url;
        var questionnaireId = response.data.questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        this.router.navigate([newUrl]);
      }
    });
  }

}
