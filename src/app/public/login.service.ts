import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';

export class LoginDetail {
    public userName: string;
    public clientCode: string;
    public password: string;
    constructor() { }
}


@Injectable()
export class LoginService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginURL = environment.serverURL+'api/public/login';
     private resetPwdURL = environment.serverURL+'api/public/forgetpwd';

    constructor(private http: Http) { }


    login(loginData: LoginDetail): Promise<any> {
        const url = `${this.loginURL}`;
        return this.http
            .post(url, JSON.stringify(loginData), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    resetPassword(emailId: string): Promise<any> {
        const url = `${this.resetPwdURL}`;
        return this.http
            .post(url, JSON.stringify({"emailId":emailId}), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
