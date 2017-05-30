import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionDetail, Answer, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
    templateUrl: './questionnairePreview.component.html',
    styleUrls: ['./questionnairePreview.component.css']
})

export class QuestionnairePreviewComponent implements OnInit {
    //  @HostBinding('@routeAnimation') routeAnimation = true;
    //@HostBinding('style.display')   display = 'block';
    //@HostBinding('style.position')  position = 'absolute';

    questionnaireId: number;
    questions: any[] = [];
    public currentQuestion: QuestionDetail = new QuestionDetail();

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

        this.service.getQuestionsByQuestionnaireId(this.questionnaireId).then(response => {
            if (response.status === 'success') {
                this.questions = response.data;
                console.log(this.questions)
            }
        });


    }

    
}