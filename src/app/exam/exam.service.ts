import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';

export class candidate {
    public candidateId: string;
    public hashCode: string;
    public isSelected: boolean;
    constructor() {
    }
}

export class ExamDetail {
    examId: Number;
    clientId: Number;
    creationDate: Date;
    createdBy: String;
    updateDate: Date;
    updatedBy: String;
    examAvailability: String;
    examDuration: String;
    orderOfQestions: String;
    showRightAnswer: Boolean;
    resultType: String = "Pass or Fail";
    mailToExamTaker: Boolean;
    mailToCandidate: Boolean;
    documentMailToExamTaker: String;
    documentMailToCandidate: String;
    candidates: candidate[] = [];
    scoring : string="Assign total points to the exam";
    minimumPassingScore: string;
    questions:any[] = [];
    constructor() { }
}





@Injectable()
export class ExamService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private createExamURL = 'api/admin/client/:clientId/exam';
    private updateExamURL = 'api/admin/client/:clientId/exam';
    private getExamByIdURL = 'api/admin/client/:clientId/exam/:examId';
    private quickAddCandidateURL = 'api/admin/client/:clientid/quickaddcandidate';

    constructor(private httpService: HttpService, private sharedService: sharedService, private cookieService: CookieService) {

        var loginData = this.cookieService.readCookie('loginData');
        if (loginData) {
            this.headers.append('x-access-token', loginData.token);
        }
    }

    createExam(examData: ExamDetail): Promise<any> {

        const url = `${this.createExamURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, examData, this.headers)
            .then(res => res);

    }

    updateExam(examData: ExamDetail): Promise<any> {

        const url = `${this.updateExamURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .put(newUrl, examData, this.headers)
            .then(res => res);

    }

    getExamById(examId: number): Promise<any> {

        const url = `${this.getExamByIdURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        newUrl = newUrl.replace(/:examId/i, examId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);
    }

    quickAddCandidate(CandidateList: any[]): Promise<any> {

        const url = `${this.quickAddCandidateURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, CandidateList, this.headers)
            .then(res => res);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
