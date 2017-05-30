import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginDetail, LoginService } from './login.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

isPassReset = false;
  loginData: LoginDetail = new LoginDetail();
  forgetPasswordEmailId: string;
  loginForm: NgForm;

  @ViewChild('loginForm') currentForm: NgForm;
  @ViewChild('forgetPassword') public forgetPasswordForm: ModalDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService,
    private sharedService: sharedService,
    private cookieService: CookieService
  ) { }

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

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        if (messages) {
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
    'password': ''
  };

  validationMessages = {
    'clientCode': {
      'required': 'Client Code is required.',
      'pattern': 'User Name is InValid.'
    },
    'userName': {
      'required': 'User name is required.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

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

  login() {
    this.service.login(this.loginData).then(response => {
      if (response.status === 'success') {
        this.sharedService.setCurrentUser(response.data.user);
        this.sharedService.setSecurityToken(response.data.token)
        this.createCookie('loginData', response.data, 2);

        this.router.navigate(['/organisor/home']);
      }
    });
  }

showForgetPassModel(){
  this.forgetPasswordEmailId = '';
  this.forgetPasswordForm.show();
}

  resetPassword() {
    this.service.resetPassword(this.forgetPasswordEmailId).then(response => {
      if (response && response.status === 'success') {
        this.forgetPasswordForm.hide();
        this.router.navigate(['/success', "RESETPASSSUCC"]);
      }
      else {
        this.forgetPasswordForm.hide();
      }
    });
  }
}
