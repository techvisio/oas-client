import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';

export class QuestionnaireDetail {
    public questionnaireId: number;
    public clientId: number;
    public desc: string;
    public noOfQuestion: number;
    public marks: number;
    public subject: string;
    public duration: number;
    public creationDate: Date;
    public createdBy: String;
    public updateDate: Date;
    public updatedBy: String;
    public questions: any[];
    public status: string;
    constructor() { }
}

export class Answer {
    public description: string;
    public imageURL: string;
    public isCorrect: boolean;
    public isSelected: boolean;
    public imagePath: string;
    constructor() {
    }
}

export class QuestionDetail {

    public questionType: string = "MULTIPLE_CHOICE_SINGLE";
    public questionDesc: string;
    public questionId: number;
    public clientId: number;
    public imageURL: string;
    public section: string;
    public difficulty: string;
    public isActive: boolean;
    public creationDate: Date;
    public createdBy: string;
    public updateDate: Date;
    public updatedBy: string;
    public answer: Answer[] = [];
    public questionStatus: string;
    public isSelected: boolean;
    public category: any[] = [];
    public imageAnsView: boolean = false;
    public imagePath: string;
    public questionView: string;
    public quesExplaination: string;
    public marks: number = 1;
    public negMarks: number = 1;
    constructor() {
    }
}

@Injectable()
export class QuestionnaireService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private saveQuestionnaireURL = 'api/admin/client/:clientId/questionnaire';
    private updateQuestionnaireURL = 'api/admin/client/:clientid/questionnaire';
    private getQuestionsByQuestionnaireIdURL = 'api/admin/client/:clientid/qnr/:qnrId/questions';
    private getQuestionnaireByIdURL = 'api/admin/client/:clientId/qnr/:qnrId';
    private getQuestionByIdURL = 'api/admin/client/:clientId/question/:quesId';
    private saveQuestionURL = 'api/admin/client/:clientId/qnr/:qnrId/question';
    private saveSingleQuestionURL = 'api/admin/client/:clientId/question/new';
    private createQnrFromQuesURL = 'api/admin/client/:clientId/qnr/questions';
    private updateQuestionURL = 'api/admin/client/:clientId/qnr/:qnrId/question';
    private updateSingleQuestionURL = 'api/admin/client/:clientId/question';
    private deleteQuestionFromQuestionnaireURL = 'api/admin/client/:clientId/qnr/:qnrId/question/:quesId';
    private getMasterDataURL = 'api/admin/client/:clientId/masterdata/:masterDataType';
    private updateMasterDataURL = 'api/admin/client/:clientId/masterdata/:dataName';
    private getFiltteredQuestionsURL = 'api/admin/client/:clientid/filterquestion';
    private getFiltteredQuestionnairesURL = 'api/admin/client/:clientid/filterquestionnaire';
    private importQuestionsURL = 'api/admin/client/:clientId/qnr/:qnrId/import';
    private imageUploadURL = 'api/admin/client/:clientId/util/upload/img';
    private getClientImageURL = 'api/admin/client/:clientId/util/img';
    private copyQuestionsURL = 'api/admin/client/:clientId/qnr/:qnrId/copyquestions';
    private finalizeQuestionnareURL = 'api/admin/client/:clientId/qnr/:qnrId/finalize';

    constructor(private httpService: HttpService, private sharedService: sharedService, private cookieService: CookieService) {

        var loginData = this.cookieService.readCookie('loginData');
        if (loginData) {
            this.headers.append('x-access-token', loginData.token);
        }
    }

    getFiltteredQuestions(filterData: any): Promise<any> {

        const url = `${this.getFiltteredQuestionsURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, filterData, this.headers)
            .then(res => res);
    }

    getFiltteredQuestionnaires(filterData: any): Promise<any> {

        const url = `${this.getFiltteredQuestionnairesURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, filterData, this.headers)
            .then(res => res);
    }

    saveQuestionnaire(questionnaireData: QuestionnaireDetail): Promise<any> {

        const url = `${this.saveQuestionnaireURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, questionnaireData, this.headers)
            .then(res => res);

    }

    createQnrFromQuestions(questions: any[]): Promise<any> {

        const url = `${this.createQnrFromQuesURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, questions, this.headers)
            .then(res => res);

    }

    updateQuestionnaire(questionnaireData: QuestionnaireDetail): Promise<any> {

        const url = `${this.updateQuestionnaireURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .put(newUrl, questionnaireData, this.headers)
            .then(res => res);

    }

    finalizeQuestionnaire(questionnaireData: QuestionnaireDetail): Promise<any> {

        const url = `${this.finalizeQuestionnareURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var qnrId = questionnaireData.questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, qnrId.toString());
        return this.httpService
            .put(newUrl, questionnaireData, this.headers)
            .then(res => res);

    }

    copyQuestions(questionnaireData: QuestionnaireDetail, questionnaireId: number): Promise<any> {

        const url = `${this.copyQuestionsURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .post(newUrl, questionnaireData, this.headers)
            .then(res => res);
    }


    getQuestionsByQuestionnaireId(questionnaireId: number): Promise<any> {

        const url = `${this.getQuestionsByQuestionnaireIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);
    }


    getQuestionnaireById(questionnaireId: number): Promise<any> {

        const url = `${this.getQuestionnaireByIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);
    }


    getQuestionById(questionId: number): Promise<any> {

        const url = `${this.getQuestionByIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        newUrl = newUrl.replace(/:quesId/i, questionId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);
    }

    saveQuestion(questionData: QuestionDetail, questionnaireId: number): Promise<any> {

        const url = `${this.saveQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .post(newUrl, questionData, this.headers)
            .then(res => res);

    }

    saveSingleQuestion(questionData: QuestionDetail): Promise<any> {

        const url = `${this.saveSingleQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());

        return this.httpService
            .post(newUrl, questionData, this.headers)
            .then(res => res);

    }

    updateSingleQuestion(questionData: QuestionDetail): Promise<any> {

        const url = `${this.updateSingleQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());

        return this.httpService
            .put(newUrl, questionData, this.headers)
            .then(res => res);

    }

    importQuestions(questions: any[], questionnaireId: number): Promise<any> {

        const url = `${this.importQuestionsURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .post(newUrl, questions, this.headers)
            .then(res => res);
    }


    updateQuestion(questionData: QuestionDetail, questionnaireId: number): Promise<any> {

        const url = `${this.updateQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        return this.httpService
            .put(newUrl, questionData, this.headers)
            .then(res => res);
    }

    deleteQuestionFromQuestionnaire(questionId: number, questionnaireId: number): Promise<any> {

        const url = `${this.deleteQuestionFromQuestionnaireURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/:qnrId/i, questionnaireId.toString());
        var questionId = questionId;
        newUrl = newUrl.replace(/:quesId/i, questionId.toString());
        return this.httpService
            .delete(newUrl, this.headers)
            .then(res => res);
    }

    getMasterData(masterDataType: string): Promise<any> {

        const url = `${this.getMasterDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var masterDataType = masterDataType;
        newUrl = newUrl.replace(/:masterDataType/i, masterDataType.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);

    }

    updateMasterData(masterData: any, dataName: string): Promise<any> {

        const url = `${this.updateMasterDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var dataName = dataName;
        newUrl = newUrl.replace(/:dataName/i, dataName.toString());
        return this.httpService
            .put(newUrl, masterData, this.headers)
            .then(res => res);

    }

    getFileUploadOption() {
        var clientId = this.sharedService.getCurrentUser().clientId;
        var imgURL = environment.serverURL + this.imageUploadURL;
        imgURL = imgURL.replace(/:clientId/i, clientId.toString());
        var securityToken = this.headers.get('x-access-token');
        return {
            url: imgURL,
            authTokenHeader: "x-access-token",
            authToken: securityToken
        }
    }

    getClientImages(showAll) {
        const url = `${this.getClientImageURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        newUrl += '?showAll=' + (showAll ? "true" : "false");
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
