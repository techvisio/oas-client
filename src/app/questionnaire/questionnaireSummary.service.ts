import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import {HttpService} from  '../utils/http.service';

export class QuestionnaireSummaryDetail {
    public userName: string;
    public clientCode: string;
    public password: string;
    constructor() { }
}


@Injectable()
export class QuestionnaireSummaryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginURL = 'api/public/login';
     private resetPwdURL = environment.serverURL+'api/public/forgetpwd';

    constructor(private httpService:HttpService) { }


    questionnaireSummary(questionnaireSummaryData: QuestionnaireSummaryDetail): Promise<any> {
        const url = `${this.loginURL}`;
        return this.httpService
            .post(url, questionnaireSummaryData, this.headers)
            .then(res => res);
            
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
