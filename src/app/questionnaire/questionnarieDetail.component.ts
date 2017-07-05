import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sharedService } from '../common/shared.service';
import { QuestionDetail, Answer, QuestionnaireDetail, QuestionnaireService } from './questionnaire.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../environment';

@Component({
  templateUrl: './questionnarieDetail.component.html',
  styleUrls: ['./questionnarieDetail.component.css']
})

export class QuestionnaireDetailComponent implements OnInit {

  public questionnaire: QuestionnaireDetail = new QuestionnaireDetail();
  public currentQuestion: QuestionDetail = new QuestionDetail();
  saveButtonText = 'Save';
  questionnaireForm: NgForm;
  questionCategories = [];
  public sections: any[] = [];
  public categories: any[] = [];
  public subjects: any[] = [];
  imageQuesPath = '';
  public customSectionSelected: any;
  public customCategorySelected: any;
  @ViewChild('questionnaireForm') currentForm: NgForm;
  @ViewChild('uploadImage') uploadImageModal: ModalDirective;
  @ViewChild('qnrModal') qnrModal: ModalDirective;
  @ViewChild('imageModal') public imageModal: ModalDirective;
  questionnaireId: number;
  questions: any[] = [];
  isvalidOption = false;
  public difficulties: any[] = ["Easy", "Medium", "Hard"];
  public imageCollection: any[] = [];

  public modifyingObject: any = {};
  public selectedImg = "";

  imgSrc: string;
  public uploader: FileUploader = new FileUploader(this.service.getFileUploadOption());
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public showAll: boolean = false;
  public isImageLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) {

    this.createQuestion('MULTIPLE_CHOICE_SINGLE');
    this.uploader.onCompleteAll = () => {
      this.getClientImages();
    }
  }

  setCurrentQuestion(currentQuestion: QuestionDetail) {
    var context = this;
    var clientId = this.sharedService.getCurrentUser().clientId;
    var serverURL = environment.serverURL;
    var imgPath = 'api/admin/client/' + clientId.toString() + '/util/img/';
    currentQuestion.answer.forEach(function (answer) {
      if (answer.imageURL) {
        for (var i = 1; i <= currentQuestion.answer.length; i++) {
          answer.imagePath = serverURL + imgPath + answer.imageURL;
        }
      }
    });
    if (currentQuestion.imageURL) {
      currentQuestion.imagePath = serverURL + imgPath + currentQuestion.imageURL;
      context.imageQuesPath = currentQuestion.imagePath;
    }
    context.currentQuestion = currentQuestion;
  }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });


    this.service.getMasterData('subject').then(response => {
      if (response.status === 'success') {
        this.subjects = response.data;
      }
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

  updateQuestionnaire() {
    this.service.updateQuestionnaire(this.questionnaire).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        this.qnrModal.hide();
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
          this.setCurrentQuestion(response.data);

        }
      });
    }
    else {
      this.service.saveQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.setCurrentQuestion(response.data);
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

  showImageUploader() {
    this.uploadImageModal.show();
    this.isImageLoading = true;
    this.getClientImages();
  }

  getClientImages() {
    this.service.getClientImages(this.showAll).then(response => {
      if (response.status === 'success') {
        console.log(response);
        this.imageCollection = [];
        var clientId = this.sharedService.getCurrentUser().clientId;
        var serverURL = environment.serverURL;
        var imgPath = 'api/admin/client/' + clientId.toString() + '/util/img/';
        var clientmages = response.data;
        var innerArray = new Array;
        var imgObject;
        for (var i = 1; i <= clientmages.length; i++) {
          imgObject = new Object();
          imgObject.imageFullPath = serverURL + imgPath + clientmages[i - 1].imageName
          imgObject.imageName = clientmages[i - 1].imageName;
          innerArray.push(imgObject);

          if (innerArray.length == 7) {
            this.imageCollection.push(innerArray);
            innerArray = new Array;
          }

          if (i == clientmages.length && !(innerArray.length <= 0)) {
            this.imageCollection.push(innerArray);
          }
        }
        console.log(this.imageCollection)

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
    this.setCurrentQuestion(selectedQuestion);
    console.log(this.currentQuestion);
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
    var context = this;
    context.categories.forEach(function (category, i) {
      if (category.value === context.customCategorySelected) {
        if (context.currentQuestion.category && context.currentQuestion.category.length > 0) {
          context.currentQuestion.category.forEach(function (tag, index) {
            if (tag === category.value) {
              context.currentQuestion.category.splice(index, 1);
            }
          });
        }
        context.currentQuestion.category.push(category.key);
      }
    });
  }
  addSectionToCurrentQuestion() {
    var context = this;
    context.sections.forEach(function (section, i) {
      if (section.value === context.customSectionSelected) {
        context.currentQuestion.section = section.key;
      }
    });
  }

  removeCategory(questionCategory) {
    var context = this;
    context.questionCategories.forEach(function (category, index) {
      if (questionCategory === category) {
        context.questionCategories.splice(index, 1);
      }
    });
  }

  setModifyingObj(obj) {
    this.modifyingObject = obj;
  }

  setCurrentImg() {
    this.modifyingObject.imageURL = this.selectedImg;
    this.modifyingObject.imagePath = this.imageQuesPath;
    this.uploadImageModal.hide();
  }

  hideUploadModal() {
    this.modifyingObject = {};
    this.selectedImg = '';
  }

  setCurrentImgPath(image) {
    this.imageQuesPath = image;

  }

  removeImage(object) {
    object.imageURL = '';
  }
}