import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import {HttpService} from  '../utils/http.service';
import {sharedService} from  '../common/shared.service';

export class QuestionnaireDetail {
    public desc: string;
    public noOfQuestion: number;
    public marks: number;
    public duration: number;
    
    constructor() { }
}

export class QuestionDetail {
    public desc: string;
    public noOfQuestion: number;
    public marks: number;
    public duration: number;
    
    constructor() { }
}


@Injectable()
export class QuestionnaireService {
    
    
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private saveQuestionnaireURL = 'api/admin/client/'+1+'/questionnaire';
    private saveQuestionURL = 'api/admin/client/:clientid/qnr/:id/question';

    constructor(private httpService:HttpService, private sharedService:sharedService) { }

    saveQuestionnaire(questionnaireData: QuestionnaireDetail): Promise<any> {
        
        const url = `${this.saveQuestionnaireURL}`;
        return this.httpService
            .post(url, questionnaireData, this.headers)
            .then(res => res);
            
    }

saveQuestion(questionData: QuestionDetail): Promise<any> {
        
        const url = `${this.saveQuestionnaireURL}`;
        return this.httpService
            .post(url, questionData, this.headers)
            .then(res => res);
            
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
