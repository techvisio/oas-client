import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { ReplaySubject } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HttpService {

    private currentRequestCounts = 0;
    private serverURL = environment.serverURL;
    public httpError: ReplaySubject<any> = new ReplaySubject(0);

    constructor(private http: Http,
        private slimLoadingBarService: SlimLoadingBarService) { }

    post(url, data, headers) {
        var _this = this;
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        _this.incrementRequestCountandStartProcess(_this);
        return this.http
            .post(endPoint, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(handleSuccess)
            .catch(handleError);

        function handleSuccess(response: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            return response.json();
        }

        function handleError(error: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            httpError.next(error.json());
            return Promise.reject(error.json());
        }

    }

    put(url, data, headers) {
        var _this = this;
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        _this.incrementRequestCountandStartProcess(_this);
        return this.http
            .put(endPoint, JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(handleSuccess)
            .catch(handleError);

        function handleSuccess(response: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            return response.json();
        }

        function handleError(error: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            httpError.next(error.json());
            return Promise.reject(error.json());
        }

    }

    get(url, headers) {
        var _this = this;
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        _this.incrementRequestCountandStartProcess(_this);
        return this.http
            .get(endPoint, { headers: headers })
            .toPromise()
            .then(handleSuccess)
            .catch(handleError);

        function handleSuccess(response: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            return response.json();
        }

        function handleError(error: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            httpError.next(error.json());
            return Promise.reject(error.json());
        }
    }

    delete(url, headers) {
        var _this = this;
        var httpError = this.httpError;
        const endPoint = this.serverURL + url;
        _this.incrementRequestCountandStartProcess(_this);
        return this.http
            .delete(endPoint, { headers: headers })
            .toPromise()
            .then(handleSuccess)
            .catch(handleError);

        function handleSuccess(response: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            return response.json();
        }

        function handleError(error: any) {
            _this.decrementRequestCountandCompleteProcess(_this);
            httpError.next(error.json());
            return Promise.reject(error.json());
        }

    }

    incrementRequestCountandStartProcess(_this) {
        _this.currentRequestCounts++;
        _this.slimLoadingBarService.start();
    }
    decrementRequestCountandCompleteProcess(_this) {
        _this.currentRequestCounts--;
        if (_this.currentRequestCounts === 0) {
            _this.slimLoadingBarService.complete();
        }
    }


}
