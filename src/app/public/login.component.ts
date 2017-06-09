import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginDetail, LoginService } from './login.service';
import { sharedService } from '../common/shared.service';
import { CookieService } from '../common/cookie.service';
import { CommonResponseService } from '../common/common-response.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  loginButtonText = 'Login';
  isPassReset = false;
  loginData: LoginDetail = new LoginDetail();
  forgetPasswordEmailId: string;
  loginForm: NgForm;
  private errorMsgs: any[] = [];
  private errorType: string;

  @ViewChild('loginForm') currentForm: NgForm;
  @ViewChild('forgetPassword') public forgetPasswordForm: ModalDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService,
    private sharedService: sharedService,
    private cookieService: CookieService,
    private errorMessageService: CommonResponseService
  ) {

  }

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

  login() {
    this.loginButtonText = 'logging in...';
    this.service.login(this.loginData).then(response => {
      if (response.status === 'success') {
        this.sharedService.setCurrentUser(response.data.user);
        this.sharedService.setSecurityToken(response.data.token)
        this.cookieService.createCookie('loginData', response.data, 2);
        this.loginButtonText = 'Login';
        this.router.navigate(['/organisor/home']);
      }
    })
      .catch(error => {
        this.handleError(error);
      });
  }

  showForgetPassModel() {
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

  private handleError(error: any) {
    this.loginButtonText = 'Login';
    var _this = this;

    if (error && error.status === 'failed') {
      if (error.errType === 'LOGIN_VALIDATION_ERROR') {
        if (error.errorCodes && error.errorCodes.length > 0) {
          _this.errorMsgs = [];
          error.errorCodes.forEach(function (errCode) {
            var errorMsg = _this.errorMessageService.getMessage(errCode);
            if (errCode === 'NO_USER_FOUND' && errorMsg) {
              _this.formErrors.clientCode = '';
              _this.formErrors.userName = '';
              _this.formErrors.clientCode += errorMsg + ' ';
              _this.formErrors.userName += errorMsg + ' ';
            }
            if (errCode === 'INVALID_CREDENTIAL' && errorMsg) {
              _this.formErrors.password = '';
              _this.formErrors.password += errorMsg + ' ';
            }

          })
        }
        if (error.errMsg) {
          _this.errorMsgs = [];
          _this.errorMsgs.push(error.errMsg);
        }
      }
    }
  }
}
