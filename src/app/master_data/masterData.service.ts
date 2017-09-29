import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environment';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';




export class Data {
    public _id: string;
    public value: string;
    public isActive: boolean;
    public logicalValue: string;
    constructor() {
    }
}


export class MasterDataDetail {

    public clientId: number;
    public dataName: string;
    public isEditable: boolean;
    public data:Data[] = [];
    public creationDate: Date;
    public createdBy: string;
    public updateDate: Date;
    public updatedBy: string;
    constructor() { }
}

@Injectable()
export class MasterDataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private getMasterDataURL = 'api/admin/client/:clientId/masterdata/:masterDataType';
    private updateMasterDataURL = 'api/admin/client/:clientId/masterdata';
    private getMasterDataNamesURL = 'api/admin/client/:clientId/masterdata/all/masterdataname';
    private saveListOfDataURL = 'api/admin/client/:clientId/masterdata/multi/masterdata';

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


    saveListOfData(masterData: MasterDataDetail): Promise<any> {

        const url = `${this.saveListOfDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .put(newUrl, masterData, this.headers)
            .then(res => res);

    }

    updateMasterData(masterData: MasterDataDetail): Promise<any> {

        const url = `${this.updateMasterDataURL}`;
        var newUrl = url;
        var clientId = this.sharedService.getCurrentUser().clientId;
        newUrl = newUrl.replace(/:clientId/i, clientId.toString());
        return this.httpService
            .put(newUrl, masterData, this.headers)
            .then(res => res);

    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
