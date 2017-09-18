import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';

export class MasterDataDetail {

    constructor() { }
}

@Injectable()
export class MasterDataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private getMasterDataURL = 'api/admin/client/:clientId/masterdata/:masterDataType';
    private updateMasterDataURL = 'api/admin/client/:clientId/masterdata/:dataName';
    private getMasterDataNamesURL = 'api/admin/client/:clientId/masterdata/masterdatanames';

    constructor(private httpService: HttpService, private sharedService: sharedService, private cookieService: CookieService) {

        var loginData = this.cookieService.readCookie('loginData');
        if (loginData) {
            this.headers.append('x-access-token', loginData.token);
        }
    }


    getMasterData(masterDataType: string): Promise<any> {

        const url = `${this.getMasterDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var masterDataType = masterDataType;
        newUrl = newUrl.replace(/:masterDataType/i, masterDataType.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);

    }

    getMasterDataNames(): Promise<any> {

        const url = `${this.getMasterDataNamesURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .get(newUrl, this.headers)
            .then(res => res);

    }


    updateMasterData(masterData: any, dataName: string): Promise<any> {

        const url = `${this.updateMasterDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        var dataName = dataName;
        newUrl = newUrl.replace(/:dataName/i, dataName.toString());
        return this.httpService
            .put(newUrl, masterData, this.headers)
            .then(res => res);

    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
