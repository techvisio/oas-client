import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';

export class QuestionnaireDetail {
    public questionnaireId: number;
    public clientId: number;
    public desc: string;
    public noOfQuestion: number;
    public marks: number;
    public duration: number;
    public creationDate: Date;
    public createdBy: String;
    public updateDate: Date;
    public updatedBy: String;

    constructor() { }
}

export class Answer {
    public description: string;
    public imageURL: string;
    public isCorrect: boolean;
    public isSelected: boolean;

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

    constructor() {
    }
}

@Injectable()
export class QuestionnaireService {


    private headers = new Headers({ 'Content-Type': 'application/json' });
    private saveQuestionnaireURL = 'api/admin/client/clientId/questionnaire';
    private getQuestionsByQuestionnaireIdURL = 'api/admin/client/clientid/qnr/qnrId/questions';
    private getQuestionnaireByIdURL = 'api/admin/client/clientId/qnr/qnrId';
    private saveQuestionURL = 'api/admin/client/clientId/qnr/qnrId/question';
    private updateQuestionURL = 'api/admin/client/clientId/qnr/qnrId/question';
    private deleteQuestionFromQuestionnaireURL = 'api/admin/client/clientId/qnr/qnrId/question/quesId';

    constructor(private httpService: HttpService, private sharedService: sharedService) { }

    saveQuestionnaire(questionnaireData: QuestionnaireDetail): Promise<any> {

        const url = `${this.saveQuestionnaireURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, questionnaireData, this.headers)
            .then(res => res);

    }

    getQuestionsByQuestionnaireId(questionnaireId: number): Promise<any> {

        const url = `${this.getQuestionsByQuestionnaireIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);

    }


    getQuestionnaireById(questionnaireId: number): Promise<any> {

        const url = `${this.getQuestionnaireByIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);

    }

    saveQuestion(questionData: QuestionDetail, questionnaireId: number): Promise<any> {

        const url = `${this.saveQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        return this.httpService
            .post(newUrl, questionData, this.headers)
            .then(res => res);

    }


    updateQuestion(questionData: QuestionDetail, questionnaireId: number): Promise<any> {

        const url = `${this.updateQuestionURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        return this.httpService
            .put(newUrl, questionData, this.headers)
            .then(res => res);

    }

    deleteQuestionFromQuestionnaire(questionId: number, questionnaireId: number): Promise<any> {

        const url = `${this.deleteQuestionFromQuestionnaireURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/clientId/i, clientId.toString());
        var questionnaireId = questionnaireId;
        newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
        var questionId = questionId;
        newUrl = newUrl.replace(/quesId/i, questionId.toString());
        return this.httpService
            .delete(newUrl, this.headers)
            .then(res => res);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
