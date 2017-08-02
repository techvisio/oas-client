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
    public isActive: Boolean;
    public identifier:String;
    public candidateGroups: any[] = [];

    constructor() {
    }
}

export class CandidateGroupDetail {

    public groupName: String;
    public candidateGroupId: Number;
    public clientId: Number;
    public creationDate: Date;
    public createdBy: String;
    public updateDate: Date;
    public updatedBy: String;
    public candidates: any[] = [];


    constructor() {
    }
}

@Injectable()
export class CandidateService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    private createCandidateURL = 'api/admin/client/:clientid/candidate';
    private getAllCandidatesURL = 'api/admin/client/:clientid/candidates';
    private createCandidateGroupURL = 'api/admin/client/:clientid/candidategroup';
    private getAllCandidateGroupURL = 'api/admin/client/:clientid/candidategroups';
    private getFiltteredCandidateURL = 'api/admin/client/:clientid/filtercandidate';
    private deleteCandidateURL = 'api/admin/client/:clientid/candidate/candidateId/delete';


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

    getCandidates(data: any): Promise<any> {

        const url = `${this.getAllCandidatesURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, data, this.headers)
            .then(res => res);
    }

    createCandidateGroup(candidateGroupData: CandidateGroupDetail): Promise<any> {

        const url = `${this.createCandidateGroupURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, candidateGroupData, this.headers)
            .then(res => res);
    }

    getCandidateGroups(data: any): Promise<any> {

        const url = `${this.getAllCandidateGroupURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, data, this.headers)
            .then(res => res);
    }

    getFiltteredCandidates(filterData: any): Promise<any> {

        const url = `${this.getFiltteredCandidateURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .post(newUrl, filterData, this.headers)
            .then(res => res);
    }

    deleteCandidate(candidateData: CandidateDetail): Promise<any> {

        const url = `${this.deleteCandidateURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var candidateId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:candidateId/i, candidateData.candidateId.toString());
        return this.httpService
            .put(newUrl, candidateData, this.headers)
            .then(res => res);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
