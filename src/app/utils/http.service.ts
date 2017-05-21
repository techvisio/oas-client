import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class HttpService {

    private serverURL = environment.serverURL;
    public httpError: ReplaySubject<any> = new ReplaySubject(0);

    constructor(private http: Http) { }

    post(url, data, headers) {
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        return this.http
            .post(endPoint, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(handleError);

        function handleError(error: any) {
            httpError.next(error.json());
        }
    }

    put(url, data, headers) {
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        return this.http
            .put(endPoint, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(handleError);

        function handleError(error: any) {
            httpError.next(error.json());
        }
    }

    get(url, headers) {
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        return this.http
            .get(endPoint, { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(handleError);

        function handleError(error: any) {
            httpError.next(error.json());
        }
    }

}
