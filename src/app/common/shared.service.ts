import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserDetail } from '../user/user.service';
import { CookieService } from '../common/cookie.service';

@Injectable()
export class sharedService {
    private user: UserDetail;
    private SEC_TOKEN: string;


    constructor(private cookieService: CookieService) {
        var loginData = this.cookieService.readCookie('loginData');
        if(loginData){
        this.setCurrentUser(loginData.user);
        this.setSecurityToken(loginData.token); 
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
} 