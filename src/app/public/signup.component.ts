import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonResponseService } from '../common/common-response.service';
import { EqualValidator } from '../directives/equal-validator.directive';
import { SignupDetail, SignupService } from './signup.service';


@Component({
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translateX(0)', 'opacity': 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
          ]
        )]
    )
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  //  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  signupData: SignupDetail = new SignupDetail();
  confirmpassword: string = '';
  signupForm: NgForm;
  registerButtonText = 'Register';
  private errorMsgs: any[] = [];
  private errorType: string;


  @ViewChild('signupForm') currentForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SignupService,
    private errorMessageService: CommonResponseService
  ) { }

  ngOnInit() {
    this.route.params
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.signupForm) { return; }
    this.signupForm = this.currentForm;
    if (this.signupForm) {
      this.signupForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm.form;

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
    'cnctName': '',
    'orgName': '',
    'emailId': '',
    //'cnctNo': '',
    'userName': '',
    'password': '',
    'confirmpassword': ''
  };

  validationMessages = {
    'cnctName': {
      'required': 'Contact Name is required.',
      'pattern': 'Contact Name is InValid.'
    },
    'orgName': {
      'required': 'Organisation Name is required.'
    },
    'emailId': {
      'required': 'Email Id is required.',
      'pattern': 'Email Id is InValid.'
    },
    /*'cnctNo': {
      'required': 'Contact No is required.',
      'pattern': 'Contact No is InValid.'
    },*/
    'userName': {
      'required': 'User name is required.',
      'pattern': 'User name is InValid.'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password should contain 1 special character, 1 upper case, 1 lower case, 1 numeric and minimum 8 characters.'
    },
    'confirmpassword': {
      'required': 'Confirm Password is required.',
      'validateEqual': 'password and confirm password are not same'
    }

  };

  signup() {
    this.registerButtonText = 'please wait while registering...';
    this.service.signUp(this.signupData).then(response => {
      if (response.status === 'success') {
        this.registerButtonText = 'Register';
        this.router.navigate(['/success', "SIGNSUCC"]);
      }
    })
      .catch(error => {
        this.handleError(error);
      });
  }

  private handleError(error: any) {
    this.registerButtonText = 'Register';
    var _this = this;

    if (error && error.status === 'failed') {
      if (error.errType === 'SIGN_UP_VALIDATION_ERROR') {
        if (error.errorCodes && error.errorCodes.length > 0) {
          _this.errorMsgs = [];
          error.errorCodes.forEach(function (errCode) {
            var errorMsg = _this.errorMessageService.getMessage(errCode);
            if (errCode === 'DUPLICATE_CLIENT_EMAIL' && errorMsg) {
              _this.formErrors.emailId = '';
              _this.formErrors.emailId += errorMsg + ' ';
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
  /*gotoHeroes() {
    //let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    //this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }*/
}
