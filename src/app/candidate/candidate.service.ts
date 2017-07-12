import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';


export class CandidateDetail {
    public candidateId: number;
    public clientId: number;
    public creationDate: Date;
    public createdBy: String;
    public updateDate: Date;
    public updatedBy: String;
    public firstName: String;
    public lastName: String;
    public gender: String;
    public contactNo: String;
    public emailId: String;
    public createUser: Boolean;

    constructor() {
    }
}

@Injectable()
export class CandidateService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    private createCandidateURL = 'api/admin/client/:clientid/candidate';

    constructor(private httpService: HttpService, private sharedService: sharedService, private cookieService: CookieService) {

        var loginData = this.cookieService.readCookie('loginData');
        if (loginData) {
            this.headers.append('x-access-token', loginData.token);
        }
    }

    createCandidate(candidateData: CandidateDetail): Promise<any> {

        const url = `${this.createCandidateURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, candidateData, this.headers)
            .then(res => res);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
