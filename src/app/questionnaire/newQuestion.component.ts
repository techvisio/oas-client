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
import { guiEditorComponent } from './tinyMce.component';

@Component({
    templateUrl: './newQuestion.component.html',
    styleUrls: ['./questionnarieDetail.component.css']
})

export class NewQuestionComponent implements OnInit {

    public currentQuestion: QuestionDetail = new QuestionDetail();
    public masterData: any = {
        data: {}
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
    
    @ViewChild('questionnaireForm') currentForm: NgForm;
    @ViewChild('uploadImage') uploadImageModal: ModalDirective;
    @ViewChild('insertQuestion') public insertQuestion: ModalDirective;
    @ViewChild('section') public section: ModalDirective;


    isvalidOption = false;
    showEditor = false;
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


    ngOnInit() {

        this.service.getMasterData('section').then(response => {
            if (response.status === 'success') {
                this.sections = response.data;
                console.log(this.sections);
            }
        });

        this.service.getMasterData('category').then(response => {
            if (response.status === 'success') {
                this.categories = response.data;
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

    saveQuestion() {
        this.service.saveSingleQuestion(this.currentQuestion).then(response => {
            if (response.status === 'success') {
                this.redirectToQuestinManage();

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


    getValueByKeyForQuesCategory(question) {
        var context = this;
        var quesCategory = [];

        question.category.forEach(function (category) {
            context.categories.forEach(function (masCategory) {
                if (masCategory.key === category) {
                    quesCategory.push(masCategory.value);
                }
            });
        });
        context.questionCategories = quesCategory;
    }

    getValueByKeyForQuesSection(question) {
        var context = this;
        for (var i = 0; i < context.sections.length; i++) {
            if (context.sections[i].key === question.section) {
                context.customSectionSelected = context.sections[i].value;
                console.log('section ' + context.customSectionSelected);
                break;
            }
        }

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
                            if (tag === category.key) {
                                context.currentQuestion.category.splice(index, 1);
                            }
                        });
                    }
                    context.currentQuestion.category.push(category.key);
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
                    context.currentQuestion.section = section.key;
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
                    if (category.value === questionCategory && category.key === quesCategory) {
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
        var dataName = "category"
        context.masterData.data.value = categoryName;
        context.masterData.data.key = categoryName.toUpperCase();
        context.currentQuestion.category.push(context.masterData.data.key);
        context.service.updateMasterData(context.masterData, dataName).then(response => {
            if (response.status === 'success') {
                this.categories = response.data.data;
                context.getValueByKeyForQuesCategory(context.currentQuestion);
            }
        });

    }

    createSectionMasterData(section) {
        var context = this;
        var dataName = "section"
        context.masterData.data.value = section;
        context.masterData.data.key = section.toUpperCase();
        context.currentQuestion.section = context.masterData.data.key;
        context.service.updateMasterData(context.masterData, dataName).then(response => {
            if (response.status === 'success') {
                this.sections = response.data.data;
                this.getValueByKeyForQuesSection(context.currentQuestion);
                this.section.hide();
            }
        });
    }

    showInsertQuestionModal() {

        this.insertQuestion.show();

    }

    redirectToQuestinManage() {
        this.router.navigate(['ques/manage']);

    }

}