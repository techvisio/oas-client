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
    mainArray: any[] = [];
    currentIndex: number = 0;
    currentQuesNo: number = 1;
    isSelected: boolean = false;

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
                this.currentQuestion = this.questions[0];
                var innerArray = new Array;
                for (var i = 1; i <= this.questions.length; i++) {

                    innerArray.push(i);

                    if (innerArray.length == 5) {
                        this.mainArray.push(innerArray);
                        innerArray = new Array;
                    }

                    if (i == this.questions.length && !(innerArray.length <= 0)) {
                        this.mainArray.push(innerArray);
                    }
                }
            }
        });
    }


    moveToNextQuestion() {
        this.currentIndex = this.currentIndex + 1;

        this.currentQuestion = this.questions[this.currentIndex];
        this.currentQuesNo = this.currentQuesNo + 1;
    }

    moveToPreviousQuestion() {

        this.currentIndex = this.currentIndex - 1;

        this.currentQuestion = this.questions[this.currentIndex];
        this.currentQuesNo = this.currentQuesNo - 1;
    }

    selectQuestion(index) {
        this.currentIndex = index - 1;
        this.currentQuestion = this.questions[this.currentIndex];
        this.currentQuesNo = index;
    }

    unmarkForReview() {
        this.currentQuestion.questionStatus = 'U';
    }

    markForReview() {
        this.currentQuestion.questionStatus = 'M';
    }

    attmptedQuestion(index) {
        this.currentQuestion.questionStatus = 'A';
        this.selectAnswer(index);
    }

    selectAnswer(index) {
        this.currentQuestion.answer.forEach(function (answer) {
            answer.isSelected = false;
        });

        this.currentQuestion.answer[index].isSelected = true;
    }
}