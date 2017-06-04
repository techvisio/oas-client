import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { PopoverModule,ModalModule  } from 'ngx-bootstrap';
import { EqualValidator } from '../directives/equal-validator.directive';
import { HomePageComponent }  from './homepage.component';
import { SignupComponent }   from './signup.component';
import { SignupService }   from './signup.service';
import {LoginComponent} from './login.component';
import {LoginService} from './login.service'
import {HttpService} from  '../utils/http.service';
import {sharedService} from '../common/shared.service';
import { CookieService } from '../common/cookie.service';

@NgModule({
  imports: [  
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    HomePageComponent,
    SignupComponent,
    LoginComponent,
    EqualValidator
  ],
  providers: [ SignupService,LoginService,sharedService,HttpService, CookieService  ]
})
export class PublicModule { }
