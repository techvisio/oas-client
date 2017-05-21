import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginDetail, LoginService }  from './login.service';
import {sharedService} from '../common/shared.service';

@Component({
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  loginData:LoginDetail =  new LoginDetail();
  forgetPasswordEmailId:string;
  loginForm: NgForm;

  @ViewChild('loginForm') currentForm: NgForm;
  @ViewChild('forgetPassword') public forgetPasswordForm:ModalDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService,
    private sharedService: sharedService
  ) {}

 ngOnInit() {
     this.route.params
     }

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.currentForm === this.loginForm) { return; }
  this.loginForm = this.currentForm;
  if (this.loginForm) {
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}

onValueChanged(data?: any) {
  if (!this.loginForm) { return; }
  const form = this.loginForm.form;

  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid ) {
      const messages = this.validationMessages[field];
      if(messages){
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
      }
    }
  }
}

formErrors = {
  'clientCode': '',
  'userName': '',
  'password':''
};

validationMessages = {
  'clientCode': {
    'required': 'Client Code is required.'
  },
   'userName':{
    'required': 'User name is required.'
  },
   'password':{
    'required': 'Password is required.'
  }
};


login(){
    this.service.login(this.loginData).then(response => {
      if(response.status==='success'){
        this.sharedService.setCurrentUser(response.data.user);
        this.router.navigate(['/organisor/home']);
      }
    });
  }
 
resetPassword(){
    this.service.resetPassword(this.forgetPasswordEmailId).then(response => {
      if(response && response.status==='success'){
       alert('success');
       this.forgetPasswordForm.hide();
      }
      else{
        this.forgetPasswordForm.hide();
      }
    });
} 
}
