import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class UserDetail {
    public userName: string;
    public clientCode: string;
    public clientId: number;
    constructor() { }
}


@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
  
    constructor() { }

}
