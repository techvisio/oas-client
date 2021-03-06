import { Component,OnInit,ViewChild } from '@angular/core';
import {HttpService} from  './utils/http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {CommonResponseService} from './common/common-response.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { sharedService } from './common/shared.service';

@Component({
  selector: 'root',
  templateUrl: './welcome.component.html'
})

export class AppComponent implements OnInit{
  @ViewChild('errorModal') public errorModal:ModalDirective;
  private errorMsgs:any[] = [];
  private errorType: string;
  constructor(
  private httpService:HttpService,
  private errorMessageService:CommonResponseService,
  private slimLoadingBarService: SlimLoadingBarService,
  private route: ActivatedRoute,
  private router: Router,
  private sharedService: sharedService
  ) {}
  showLoginAndSignUp = this.sharedService.getShowLoginAndSignUp(); ;
 
 ngOnInit() {
     this.httpService.httpError.subscribe(err => 
     this.showError(err));
     this.showLoginAndSignUp = this.sharedService.getShowLoginAndSignUp(); 
  }

  showError(err){
    var context=this;
   // this.errorType='INTERNAL_ERROR';
  //  context.errorMsgs.push('Unexpected error occured. Please contact your administrator.');
     if(err && err.errType==='INTERNAL_ERROR'){
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
       this.errorModal.show();
    }     
  }

  sendToLoginPage() {
    this.router.navigate(['login']);
  }
  sendTosignUpPage(){
    this.router.navigate(['signup']);
  }

   sendToDashboardPage(){
    this.router.navigate(['organisor/home']);
  }

}
