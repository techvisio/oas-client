import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserDetail } from '../user/user.service';

@Injectable()
export class sharedService {
    private user: UserDetail;
    private SEC_TOKEN: string;

    readCookie(name) {

        var key,value,result;
    //get all cookie
    var oldCookie = document.cookie.split(';');
    for (var i = 0; i < oldCookie.length; i++) {
        key = oldCookie[i].substr(0,oldCookie[i].indexOf("="));
        value = oldCookie[i].substr(oldCookie[i].indexOf("=")+1);
        key = key.replace(/^\s+|\s+$/g,"");
        if(key === name) {
            result = value;
        }
    }
    if (result == undefined) {
        return null;
    } else {
        result = JSON.parse(result);
        return result;
    }
    }

    constructor() {
        var loginData = this.readCookie('loginData');
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