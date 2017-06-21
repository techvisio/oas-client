import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { CookieService } from '../common/cookie.service';

export class LoginDetail {
    public userName: string;
    public clientCode: string;
    public password: string;
    constructor() { }
}


@Injectable()
export class LoginService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginURL = 'api/public/login';
    private resetPwdURL = 'api/public/resetpassword';

    constructor(private httpService: HttpService, private cookieService: CookieService) {

        var loginData = this.cookieService.readCookie('loginData');
        if (loginData) {
            this.headers.append('x-access-token', loginData.token);
        }
    }


    login(loginData: LoginDetail): Promise<any> {
        const url = `${this.loginURL}`;
        return this.httpService
            .post(url, loginData, this.headers)
            .then(res => res)
            .catch(error => {
                return Promise.reject(error);
            });
    }

    resetPassword(emailId: string): Promise<any> {
        const url = `${this.resetPwdURL}`;
        var requestData = {
            "emailId": emailId
        }
        return this.httpService
            .post(url, requestData, this.headers)
            .then(res => res)
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
