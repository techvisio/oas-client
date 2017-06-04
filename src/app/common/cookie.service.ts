import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CookieService {

    constructor() { }

    readCookie(name) {

        var key, value, result;
        //get all cookie
        var oldCookie = document.cookie.split(';');
        for (var i = 0; i < oldCookie.length; i++) {
            key = oldCookie[i].substr(0, oldCookie[i].indexOf("="));
            value = oldCookie[i].substr(oldCookie[i].indexOf("=") + 1);
            key = key.replace(/^\s+|\s+$/g, "");
            if (key === name) {
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

    createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toTimeString;
        }
        else {
            expires = " ";
        }
        document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
    }
} 