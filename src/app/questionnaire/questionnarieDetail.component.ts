import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sharedService } from '../common/shared.service';
import { QuestionDetail, Answer, QuestionnaireService } from './questionnaire.service';

@Component({
  templateUrl: './questionnarieDetail.component.html',
  styleUrls: ['./questionnarieDetail.component.css']
})

export class QuestionnaireDetailComponent implements OnInit {
  //  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';


  public currentQuestion: QuestionDetail = new QuestionDetail();
  questionnaireId: number;
  questionnaire = {};
  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) {
    this.createQuestion('MULTIPLE_CHOICE_SINGLE');
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });

    this.service.getQuestionsByQuestionnaireId(this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.questions = response.data;
        console.log(this.questions);
      }
    });

    this.service.getQuestionnaireById(this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        console.log(this.questionnaire);
      }
    });
  }

  createAnswerOption(num, questionType) {
    for (var i = 1; i <= num; i++) {
      var answer = new Answer();
      this.currentQuestion.answer.push(answer);
    }
    if (questionType === "TRUE_FALSE") {
      this.currentQuestion.answer[0].description = 'True';
      this.currentQuestion.answer[1].description = 'False';
    }
  }

  createQuestion(questionType) {
    this.currentQuestion = new QuestionDetail();
    this.currentQuestion.questionType = questionType;
    var num;

    switch (questionType) {
      case 'MULTIPLE_CHOICE_SINGLE':
        num = 4;
        break;
      case 'MULTIPLE_CHOICE_MULTI':
        num = 4;
        break;
      case 'TRUE_FALSE':
        num = 2;
        break;
      case 'FILL_IN_THE_BLANK':
        num = 1;
        break;
    }
    this.createAnswerOption(num, questionType);
  }

  replaceQuestion(newQuestion) {
    this.questions.forEach(function (existingQuestion, i) {
      if (existingQuestion.questionId === newQuestion.questionId) {
        existingQuestion = newQuestion;
      }
    });
  }

  saveQuestion() {
    this.currentQuestion.clientId = this.sharedService.getCurrentUser().clientId;

    if (this.currentQuestion.questionId) {
      this.service.updateQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.replaceQuestion(response.data);
          this.currentQuestion = response.data;
        }
      });
    }
    else {
      this.service.saveQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.currentQuestion = response.data;
          this.questions.push(this.currentQuestion);
        }
      });
    }

  }

  selectCurrentQuestion(selectedQuestion) {
    this.currentQuestion = selectedQuestion;
  }

}
