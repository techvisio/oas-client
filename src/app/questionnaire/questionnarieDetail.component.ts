import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sharedService } from '../common/shared.service';
import { QuestionDetail, Answer, QuestionnaireService } from './questionnaire.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  templateUrl: './questionnarieDetail.component.html',
  styleUrls: ['./questionnarieDetail.component.css']
})

export class QuestionnaireDetailComponent implements OnInit {

  public currentQuestion: QuestionDetail = new QuestionDetail();
  saveButtonText = 'Save';
  questionnaireForm: NgForm;
  questionCategories = [];
  public sections: any[] = [];
  public categories: any[] = [];
  public customSectionSelected: any;
  public customCategorySelected: any;
  @ViewChild('questionnaireForm') currentForm: NgForm;
  questionnaireId: number;
  questionnaire = {};
  questions: any[] = [];
  isvalidOption = false;
  public difficulties: any[] = ["Easy", "Medium", "Hard"];

  imgSrc: string;
  public uploader: FileUploader = new FileUploader({ url: "http://localhost:3000/api/admin/client/1/upload/img" });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

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

    this.service.getMasterData('section').then(response => {
      if (response.status === 'success') {
        this.sections = response.data;
      }
    });

    this.service.getMasterData('category').then(response => {
      if (response.status === 'success') {
        this.categories = response.data;
      }
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
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
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
    this.addSectionToCurrentQuestion();
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

  redirectImportScreen() {
    const url = 'qnr/qnrId/import';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, this.questionnaireId.toString());
    this.router.navigate([newUrl]);

  }

  selectCurrentQuestion(selectedQuestion) {
    this.currentQuestion = selectedQuestion;
    this.questionCategories = this.currentQuestion.category;
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

  showManualFileUploader() {
    var el: HTMLElement = document.getElementById('fileuploadInput');
    el.click();
  }

  addTagToCurrentQuestion() {
    var _this = this;
    _this.categories.forEach(function (category, i) {
      if (category.value === _this.customCategorySelected) {
        if (_this.currentQuestion.category && _this.currentQuestion.category.length > 0) {
          _this.currentQuestion.category.forEach(function (tag, index) {
            if (tag === category.value) {
              _this.currentQuestion.category.splice(index, 1);
            }
          });
        }
        _this.currentQuestion.category.push(category.key);
      }
    });
  }
  addSectionToCurrentQuestion() {
    var _this = this;
    _this.sections.forEach(function (section, i) {
      if (section.value === _this.customSectionSelected) {
        _this.currentQuestion.section = section.key;
      }
    });
  }

  removeCategory(questionCategory) {
      var _this = this;
    _this.questionCategories.forEach(function (category, index) {
      if (questionCategory === category) {
        _this.questionCategories.splice(index, 1);
      }
    });
  }
}