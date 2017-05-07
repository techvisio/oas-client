import { Component,OnInit,ViewChild } from '@angular/core';
import {HttpService} from  './utils/http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {CommonResponseService} from './common/common-response.service';
@Component({
  selector: 'root',
  templateUrl: './welcome.component.html'
})

export class AppComponent implements OnInit{
  @ViewChild('errorModal') public errorModal:ModalDirective;
  private errorMsgs:any[] = [];
  private errorType: string;
  constructor(private httpService:HttpService,private errorMessageService:CommonResponseService) {}
 
 ngOnInit() {
     this.httpService.httpError.subscribe(err => 
     this.showError(err));
  }

  showError(err){
    var context=this;
    this.errorType='INTERNAL_ERROR';
    context.errorMsgs.push('Unexpected error occured. Please contact your administrator.');
     if(err && err.status==='failed'){
      this.errorType=err.errType||'INTERNAL_ERROR';
      if(err.errorCodes && err.errorCodes.length>0){
        context.errorMsgs=[];
        err.errorCodes.forEach(function(errCode, index, arr){
          var errorMsg=context.errorMessageService.getMessage(errCode);
          context.errorMsgs.push(errorMsg);
        })
      }
      if(err.errMsg){
        context.errorMsgs=[];
         context.errorMsgs.push(err.errMsg);
      }
    }
    
    this.errorModal.show();
  }
}
