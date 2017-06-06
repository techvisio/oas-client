import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap';
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
saveButtonText = 'Save';
  questionnaireForm: NgForm;

  @ViewChild('questionnaireForm') currentForm: NgForm;
  questionnaireId: number;
  questionnaire = {};
  questions: any[] = [];
  isvalidOption = false;
  imgSrc: string;

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

      }
    });

    this.service.getQuestionnaireById(this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        console.log(this.questionnaire);
      }
    });
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.questionnaireForm) { return; }
    this.questionnaireForm = this.currentForm;
    if (this.questionnaireForm) {
      this.questionnaireForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    this.isFormValid(data);
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
    this.saveButtonText = 'saving...'
    this.currentQuestion.clientId = this.sharedService.getCurrentUser().clientId;

    if (this.currentQuestion.questionId) {
      this.service.updateQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.replaceQuestion(response.data);
          this.currentQuestion = response.data;
          
        }
      });
    }
    else {
      this.service.saveQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.currentQuestion = response.data;
          this.questions.push(this.currentQuestion);
        }
      });
    }

  }

  deleteQuestion() {

    this.service.deleteQuestionFromQuestionnaire(this.currentQuestion.questionId, this.questionnaireId).then(response => {
      if (response.status === 'success') {
        location.reload();
      }
    });
  }

  redirectToQuestinnairePreview() {
    const url = 'qnr/qnrId/preview';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, this.questionnaireId.toString());
    this.router.navigate([newUrl]);

  }

  selectCurrentQuestion(selectedQuestion) {
    this.currentQuestion = selectedQuestion;
  }

  isFormValid(data) {
    if (this.currentQuestion.questionType === "MULTIPLE_CHOICE_MULTI") {
      if (data.option1 || data.option2 || data.option3 || data.option4) {
        this.isvalidOption = true;
        return;
      }
      else {
        this.isvalidOption = false;
        return;
      }
    }

    if (this.currentQuestion.questionType === "MULTIPLE_CHOICE_SINGLE") {
      if (data.option1 || data.option2 || data.option3 || data.option4) {
        this.isvalidOption = true;
        return;
      }
      else {
        this.isvalidOption = false;
        return;
      }
    }

    if (this.currentQuestion.questionType === "TRUE_FALSE") {
      if (data.option1 || data.option2) {
        this.isvalidOption = true;
        return;
      }
      else {
        this.isvalidOption = false;
        return;
      }
    }

    if (this.currentQuestion.questionType === "FILL_IN_THE_BLANK") {
      this.isvalidOption = true;
    }

  }

  selectOnlyOneOption(index) {
    if (this.currentQuestion.questionType === "MULTIPLE_CHOICE_SINGLE") {
      this.currentQuestion.answer.forEach(function (answer) {
        answer.isCorrect = false;
      });
      this.currentQuestion.answer[index].isCorrect = true;
    }

    if (this.currentQuestion.questionType === "TRUE_FALSE") {
      this.currentQuestion.answer.forEach(function (answer) {
        answer.isCorrect = false;
      });
      this.currentQuestion.answer[index].isCorrect = true;
    }
  }

  getIconBasedOnQuesType(questionType) {
    if (questionType === "TRUE_FALSE") {
      return "../../assets/images/t-f.png";
    }
    if (questionType === "MULTIPLE_CHOICE_SINGLE") {
      return "../../assets/images/m-c-s.png";
    }
    if (questionType === "FILL_IN_THE_BLANK") {
      return "../../assets/images/f-i-t-b.png";
    }
    if (questionType === "MULTIPLE_CHOICE_MULTI") {
      return "../../assets/images/m-c-m.png";
    }

  }


}