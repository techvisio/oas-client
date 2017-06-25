import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuestionnaireDetail, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
    templateUrl: './questionnaireSummary.component.html',
    styleUrls: ['./questionnaireSummary.component.css']
})

export class QuestionnaireCopyComponent implements OnInit {
    //  @HostBinding('@routeAnimation') routeAnimation = true;
    //@HostBinding('style.display')   display = 'block';
    //@HostBinding('style.position')  position = 'absolute';
    questionnaireId: number;
    questionnaire: {};
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
        this.route.params.subscribe(params => {
            this.questionnaireId = params['qnrId'];
        });


        this.service.getQuestionnaireById(this.questionnaireId).then(response => {
            if (response.status === 'success') {
                this.questionnaire = response.data;
                this.copyQuestionnaireData(this.questionnaire);
            }
        });

        this.service.getMasterData('subject').then(response => {
            if (response.status === 'success') {
                this.subjects = response.data;
            }
        });
    }


    saveQuestionnaire() {
        this.questionnaireData.clientId = this.sharedService.getCurrentUser().clientId;
        this.service.copyQuestions(this.questionnaireData, this.questionnaireId).then(response => {
            if (response.status === 'success') {
                const url = 'qnr/qnrId/question';
                var newUrl = url;
                var qnrId = response.data.questionnaireId;
                newUrl = newUrl.replace(/qnrId/i, qnrId.toString());
                this.router.navigate([newUrl]);
            }
        });
    }

    copyQuestionnaireData(data) {
        this.questionnaireData.desc = data.desc;
        this.questionnaireData.noOfQuestion = data.noOfQuestion;
        this.questionnaireData.marks = data.marks;
        this.questionnaireData.duration = data.duration;
        this.questionnaireData.subject = data.subject;
    }
}
