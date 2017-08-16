import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserDetail } from '../user/user.service';
import { CookieService } from '../common/cookie.service';

@Injectable()
export class sharedService {
    private user: UserDetail;
    private SEC_TOKEN: string;
    private showLoginAndSignUp: boolean = true;
    private defaultQuestionTemplate: string;


    constructor(private cookieService: CookieService) {
        var loginData = this.cookieService.readCookie('loginData');
        if(loginData){
        this.setCurrentUser(loginData.user);
        this.setSecurityToken(loginData.token); 
        this.setShowLoginAndSignUp(loginData.showLoginSignup);
        }

        var defaultTemp = this.cookieService.readCookie('deafaultQuesTemp');
        if(defaultTemp){
        this.setDefaultQuesTemp(defaultTemp);
        }
    }

    setCurrentUser(user: UserDetail) {
        this.user = user;
    }
    getCurrentUser() {
        return this.user;
    }
    setSecurityToken(token: string) {
        this.SEC_TOKEN = token;
    }
    getSecurityToken() {
        return this.SEC_TOKEN;
    }
    setShowLoginAndSignUp(loginAndsignUp: boolean) {
        this.showLoginAndSignUp = loginAndsignUp;
    }
    getShowLoginAndSignUp() {
        return this.showLoginAndSignUp;
    }
    setDefaultQuesTemp(defaultTemp: string) {
        this.defaultQuestionTemplate = defaultTemp;
    }
    getDefaultQuesTemp() {
        return this.defaultQuestionTemplate;
    }
} 
