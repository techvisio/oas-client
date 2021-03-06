import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';
import { QuestionDetail, Answer, QuestionnaireDetail, QuestionnaireService } from './questionnaire.service';
import { MasterDataDetail, Data, MasterDataService } from '../master_data/masterData.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../environment';
import { guiEditorComponent } from './tinyMce.component';

@Component({
  templateUrl: './questionnarieDetail.component.html',
  styleUrls: ['./questionnarieDetail.component.css']
})

export class QuestionnaireDetailComponent implements OnInit {

  remainQuesToFinalize: number = 0;
  public questionnaire: QuestionnaireDetail = new QuestionnaireDetail();
  public currentQuestion: QuestionDetail = new QuestionDetail();
  public advModalQuestion: QuestionDetail = new QuestionDetail();
  public masterData: any = {
    data: []
  };

  saveButtonText = 'Save';
  questionnaireForm: NgForm;
  questionCategories = [];
  public sections: any[] = [];
  public categories: any[] = [];
  public subjects: any[] = [];
  imageQuesPath = '';
  public customSectionSelected: any = '';
  public customCategorySelected: any;
  public isEdit = true;
  public disableWithLimit: boolean = false;
  @ViewChild('questionnaireForm') currentForm: NgForm;
  @ViewChild('uploadImage') uploadImageModal: ModalDirective;
  @ViewChild('qnrModal') qnrModal: ModalDirective;
  @ViewChild('quesLimitModal') quesLimitModal: ModalDirective;
  @ViewChild('imageModal') public imageModal: ModalDirective;
  @ViewChild('insertQuestion') public insertQuestion: ModalDirective;
  @ViewChild('saveModal') public saveModal: ModalDirective;
  @ViewChild('finalize') public finalize: ModalDirective;
  @ViewChild('finalizeExam') public finalizeExam: ModalDirective;
  @ViewChild('finalizeErrorModal') public finalizeErrorModal: ModalDirective;
  @ViewChild('section') public section: ModalDirective;
  @ViewChild('advFormatting') public advFormatting: ModalDirective;

  questionnaireId: number;
  questions: any[] = [];
  isvalidOption = false;
  showEditor = false;
  showInnerHtml = false;
  finalizeText;
  public counter: number = this.currentQuestion.marks;


  public difficulties: any[] = ["Easy", "Medium", "Hard"];
  public imageCollection: any[] = [];
  public defaultQuesTemp: string;

  public modifyingObject: any = {};
  public selectedImg = "";
  innerOptionArray: any[] = [];
  MainOptionArray: any[] = [];

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
    private sharedService: sharedService,
    private cookieService: CookieService,
    private masterDataService: MasterDataService
  ) {
    this.currentQuestion.questionView = "horizontal";
    this.defaultQuesTemp = this.sharedService.getDefaultQuesTemp();
    if (this.defaultQuesTemp) {
      this.createQuestion(this.defaultQuesTemp);
    }
    else {
      this.createQuestion('MULTIPLE_CHOICE_SINGLE');
    }

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
      context.imageQuesPath = currentQuestion.imagePath;
    }
    context.currentQuestion = currentQuestion;
  }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });


    this.masterDataService.getMasterData('subject').then(response => {
      if (response.status === 'success') {
        this.subjects = response.data;
      }
    });

    this.masterDataService.getMasterData('section').then(response => {
      if (response.status === 'success') {
        this.sections = response.data;
        console.log(this.sections);
      }
    });

    this.masterDataService.getMasterData('category').then(response => {
      if (response.status === 'success') {
        this.categories = response.data;
      }
    });

    this.getAllQuestions();

    this.service.getQuestionnaireById(this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        this.disableSaveButton();
        if (this.questionnaire.status === 'Finalised') {
          this.finalizeText = "Finalized";
        }
        else {
          this.finalizeText = "Finalize";
        }
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
    if (this.currentQuestion.questionId) {
      this.service.updateQuestion(this.currentQuestion, this.questionnaireId).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.replaceQuestion(response.data);
          this.setCurrentQuestion(response.data);
          this.saveModal.show();
          this.closeSaveDataSuccessModal();
          this.isEdit = false;
          console.log(response.data);
        }
      });
    }
    else {
      if (this.questions.length == this.questionnaire.noOfQuestion || this.questions.length > this.questionnaire.noOfQuestion) {
        this.quesLimitModal.show();
      }
      else {
        this.service.saveQuestion(this.currentQuestion, this.questionnaireId).then(response => {
          if (response.status === 'success') {
            this.saveButtonText = 'Save';
            this.setCurrentQuestion(response.data);
            this.questions.push(this.currentQuestion);

            this.saveModal.show();
            this.closeSaveDataSuccessModal();
            this.reloadPage();
          }
        });
      }
    }

  }

  reloadPage() {
    var context = this;
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
  closeSaveDataSuccessModal() {
    var context = this;
    setTimeout(function () {
      context.saveModal.hide()
    }, 2000);
  }
  deleteQuestion() {
    this.service.deleteQuestionFromQuestionnaire(this.currentQuestion.questionId, this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.currentQuestion = new QuestionDetail;
        this.getAllQuestions();
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

  redirectToViewScreen(qnrId) {
    const url = 'qnr/:qnrId/view/question';
    var newUrl = url;
    var newUrl = newUrl.replace(/:qnrId/i, qnrId.toString());
    this.router.navigate([newUrl]);

  }


  redirectImportScreen() {
    if (this.questions.length == this.questionnaire.noOfQuestion || this.questions.length > this.questionnaire.noOfQuestion) {
      this.quesLimitModal.show();
    }
    else {
      const url = 'qnr/qnrId/import';
      var newUrl = url;
      var newUrl = newUrl.replace(/qnrId/i, this.questionnaireId.toString());
      this.router.navigate([newUrl]);
    }
  }

  selectQuestion(index) {
    this.questions.forEach(function (question) {
      question.isSelected = false;
    });

    this.questions[index].isSelected = true;
  }

  selectCurrentQuestion(selectedQuestion) {
    this.disableWithLimit = false;
    var context = this;
    if (!selectedQuestion.questionView) {
      selectedQuestion.questionView = "horizontal";
    }
    context.getQuestionById(selectedQuestion.questionId);
    context.getValueByKeyForQuesCategory(selectedQuestion);
    context.getValueByKeyForQuesSection(selectedQuestion);
  }

  getValueByKeyForQuesCategory(question) {
    var context = this;
    var quesCategory = [];

    question.category.forEach(function (category) {
      context.categories.forEach(function (masCategory) {
        if (masCategory._id === category) {
          quesCategory.push(masCategory._id);
        }
      });
    });
    context.questionCategories = quesCategory;
  }

  getValueByKeyForQuesSection(question) {
    var context = this;
    for (var i = 0; i < context.sections.length; i++) {
      if (context.sections[i]._id === question.section) {
        context.customSectionSelected = context.sections[i]._id;
        console.log('section ' + context.customSectionSelected);
        break;
      }
    }

  }

  isFormValid(data) {
    var context = this;

    if (context.currentQuestion.questionType === "MULTIPLE_CHOICE_SINGLE" || context.currentQuestion.questionType === "MULTIPLE_CHOICE_MULTI" || context.currentQuestion.questionType === "TRUE_FALSE") {
      context.currentQuestion.answer.forEach(function (answer) {
        if (answer.isCorrect) {
          context.isvalidOption = true;
        }
      });
    }

    else {
      context.isvalidOption = true;
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
    if (context.categories && context.categories.length > 0) {
      context.categories.forEach(function (category, i) {
        if (category.value === context.customCategorySelected) {
          if (context.currentQuestion.category && context.currentQuestion.category.length > 0) {
            context.currentQuestion.category.forEach(function (tag, index) {
              if (tag === category._id) {
                context.currentQuestion.category.splice(index, 1);
              }
            });
          }
          context.currentQuestion.category.push(category._id);
          context.getValueByKeyForQuesCategory(context.currentQuestion);
        }
      });
    }
  }

  addSectionToCurrentQuestion() {
    var context = this;
    if (context.sections && context.sections.length > 0) {
      context.sections.forEach(function (section, i) {
        if (section.value === context.customSectionSelected) {
          context.currentQuestion.section = section._id;
        }
      });
      context.getValueByKeyForQuesSection(context.currentQuestion);
    }
  }

  removeCategory(questionCategory) {
    var context = this;
    context.questionCategories.forEach(function (category, index) {
      if (questionCategory === category) {
        context.questionCategories.splice(index, 1);
      }
    });
    if (context.categories && context.categories.length > 0) {
      context.categories.forEach(function (category) {
        context.currentQuestion.category.forEach(function (quesCategory, index) {
          if (category.value === questionCategory && category._id === quesCategory) {
            context.currentQuestion.category.splice(index, 1);
          }
        });
      });
    }
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

  createCategoryMasterData(categoryName) {
    var context = this;
    var data = {
      value: categoryName,
      isActive: true,
      logicalValue: ""
    }
    context.categories.push(data);

    var masterData = new MasterDataDetail();

    masterData.dataName = "category";
    masterData.data = context.categories;

    context.masterDataService.updateMasterData(masterData).then(response => {
      if (response.status === 'success') {
        context.categories = response.data.data;
        context.categories.forEach(function (category) {
          if (category.value === categoryName) {
            context.currentQuestion.category.push(category._id);
          }
        });

        context.getValueByKeyForQuesCategory(context.currentQuestion);
      }
    });

  }

  createSectionMasterData(sectionName) {
    var context = this;

    var data = {
      value: sectionName,
      isActive: true,
      logicalValue: ""
    }


    context.sections.push(data);

    var masterData = new MasterDataDetail();

    masterData.dataName = "section";
    masterData.data = context.sections;


    context.masterDataService.updateMasterData(masterData).then(response => {
      if (response.status === 'success') {
        context.sections = response.data.data;
        context.sections.forEach(function (section) {
          if (section.value === sectionName) {
            context.currentQuestion.section = section.value;
          }
        });
        context.getValueByKeyForQuesSection(context.currentQuestion);
        context.section.hide();
      }
    });
  }

  showInsertQuestionModal() {
    if (this.questions.length == this.questionnaire.noOfQuestion || this.questions.length > this.questionnaire.noOfQuestion) {
      this.quesLimitModal.show();
    }
    else {
      this.insertQuestion.show();
    }
  }

  showFinalizeModal() {
    this.remainQuesToFinalize = 0;
    if (this.questionnaire.questions.length < this.questionnaire.noOfQuestion || this.questionnaire.questions.length > this.questionnaire.noOfQuestion) {
      this.remainQuesToFinalize = this.questionnaire.noOfQuestion - this.questions.length;
      this.finalizeErrorModal.show();
    }
    else {
      this.finalize.show();
    }
  }

  finalizeQuestionnaire() {
    this.questionnaire.status = 'Finalised';
    this.service.finalizeQuestionnaire(this.questionnaire).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        this.finalize.hide();
        this.finalizeText = "finalized";
        this.finalizeExam.show();
      }
    });
  }

  keyupHandlerFunction(event) {
    console.log(event);
    this.currentQuestion.questionDesc = event.value;
  }

  onBlur(event) {
    this.showEditor = event;
    this.showInnerHtml = true;
  }

  getAnsElementId(index, elementId) {
    return elementId + index;

  }

  showAdvFormModal(currentQuestion) {
    this.advModalQuestion = currentQuestion;
    this.advFormatting.show();
    this.setCurrentQuestion(this.advModalQuestion);
    console.log(this.advModalQuestion);
  }

  selectHorizontalView() {
    this.currentQuestion.questionView = "horizontal";
    this.setCurrentQuestion(this.currentQuestion);
  }
  select40_60View() {
    this.currentQuestion.questionView = "40_60";
    this.setCurrentQuestion(this.currentQuestion);
  }
  select60_40View() {
    this.currentQuestion.questionView = "60_40";
    this.setCurrentQuestion(this.currentQuestion);
  }
  sendToExamPage() {
    var url = 'exam/:qnrId/config';
    var newUrl = url.replace(/:qnrId/i, this.questionnaireId.toString());
    this.router.navigate([newUrl]);
  }

  addNewOption() {
    var answer = new Answer();
    this.currentQuestion.answer.push(answer);

  }

  removeOption(index) {
    var context = this;
    context.currentQuestion.answer.splice(index, 1);

  }

  getAllQuestions() {
    this.service.getQuestionsByQuestionnaireId(this.questionnaireId).then(response => {

      if (response.status === 'success') {
        this.questions = response.data;
        this.disableSaveButton();
        for (var i = 0; i < this.questions.length; i++) {
          this.questions[i].questionDesc = this.stripHtmlTags(this.questions[i].questionDesc);
        }

        console.log(this.questions);
      }
    });
  }
  setDefaultQuesTemp() {
    this.sharedService.setDefaultQuesTemp(this.defaultQuesTemp);
    this.cookieService.createCookie('deafaultQuesTemp', this.defaultQuesTemp, 2);
  }
  increment() {
    this.counter = this.counter + 1;
    this.currentQuestion.marks = this.counter;
  }

  decrement() {
    this.counter = this.counter - 1;
    this.currentQuestion.marks = this.counter;
  }

  stripHtmlTags(textToStrip) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = textToStrip;
    return tmp.textContent || tmp.innerText || "";
  }

  getQuestionById(id) {
    this.service.getQuestionById(id).then(response => {
      if (response.status === 'success') {
        this.setCurrentQuestion(response.data);
      }
    });
  }

  disableSaveButton() {
    if (!this.currentQuestion.questionId && this.questionnaire.noOfQuestion <= this.questions.length) {
      this.disableWithLimit = true;
    }

  }
}

