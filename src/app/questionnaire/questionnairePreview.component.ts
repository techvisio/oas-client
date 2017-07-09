import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionDetail, Answer, QuestionnaireDetail, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';
import { environment } from '../environment';

@Component({
    templateUrl: './questionnairePreview.component.html',
    styleUrls: ['./questionnairePreview.component.css']
})

export class QuestionnairePreviewComponent implements OnInit {
    //  @HostBinding('@routeAnimation') routeAnimation = true;
    //@HostBinding('style.display')   display = 'block';
    //@HostBinding('style.position')  position = 'absolute';

    private questionnaire: QuestionnaireDetail = new QuestionnaireDetail();
    questionnaireId: number;
    questions: any[] = [];
    private currentQuestion: QuestionDetail = new QuestionDetail();
    mainArray: any[] = [];
    currentIndex: number = 0;
    currentQuesNo: number = 1;
    isSelected: boolean = false;
    innerOptionArray: any[] = [];
    MainOptionArray: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: QuestionnaireService,
        private sharedService: sharedService
    ) { }

    setCurrentQuestion(currentQuestion: QuestionDetail) {
        var context = this;
        var clientId = this.sharedService.getCurrentUser().clientId;
        var serverURL = environment.serverURL;
        var imgPath = 'api/admin/client/' + clientId.toString() + '/util/img/';
        currentQuestion.answer.forEach(function (answer) {
            if (answer.imageURL) {
                currentQuestion.imageAnsView = true;
                context.MainOptionArray = [];
                for (var i = 1; i <= currentQuestion.answer.length; i++) {

                    answer.imagePath = serverURL + imgPath + answer.imageURL;

                    context.innerOptionArray.push(currentQuestion.answer[i - 1]);

                    if (context.innerOptionArray.length == 2) {
                        context.MainOptionArray.push(context.innerOptionArray);
                        context.innerOptionArray = new Array;
                    }
                }
            }
        });
        if (currentQuestion.imageURL) {
            currentQuestion.imagePath = serverURL + imgPath + currentQuestion.imageURL;
        }


        context.currentQuestion = currentQuestion;

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.questionnaireId = params['qnrId'];
        });

        this.service.getQuestionnaireById(this.questionnaireId).then(response => {
            if (response.status === 'success') {
                this.questionnaire = response.data;
            }
        });

        this.service.getQuestionsByQuestionnaireId(this.questionnaireId).then(response => {
            if (response.status === 'success') {
                this.questions = response.data;
                this.setCurrentQuestion(this.questions[0]);
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

        this.setCurrentQuestion(this.questions[this.currentIndex]);
        this.currentQuesNo = this.currentQuesNo + 1;
    }

    moveToPreviousQuestion() {

        this.currentIndex = this.currentIndex - 1;

        this.setCurrentQuestion(this.questions[this.currentIndex]);
        this.currentQuesNo = this.currentQuesNo - 1;
    }

    selectQuestion(index) {
        this.currentIndex = index - 1;
        this.setCurrentQuestion(this.questions[this.currentIndex]);
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

    startTimer(duration, display) {
        var start = Date.now(),
            diff,
            minutes,
            seconds;
        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + 'M' + " : " + seconds + 'S';

            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        setInterval(timer, 1000);
    }

    startExam() {
        var fiveMinutes = 60 * this.questionnaire.duration,
            display = document.querySelector('#time');
        this.startTimer(fiveMinutes, display);
    }

}