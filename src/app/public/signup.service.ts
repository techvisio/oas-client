import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {HttpService} from  '../utils/http.service';

export class SignupDetail {
    public isOrg: boolean = false;
    public orgName: string;
    public cnctName: string;
    public userName: string;
    public emailId: string;
    public password: String;
    public cnctNo: String;
    constructor() { }
}


@Injectable()
export class SignupService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private signupURL = 'api/public/signup';

    constructor(private httpService:HttpService) { }


    signUp(signupData: SignupDetail): Promise<any> {
        const url = `${this.signupURL}`;
        return this.httpService
            .post(url, signupData,this.headers)
            .then(res => res);
    }

}
