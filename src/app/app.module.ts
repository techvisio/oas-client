import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import { PublicModule } from './public/public.module';
import { CommonModule } from './common/common.module';
import { AppRoutingModule } from './app-routing.module';
import {DashboardModule} from './dashboards/dashboard.module';
import {QuestionnaireModule} from './questionnaire/questionnaire.module';
import {CandidateModule} from './candidate/candidate.module';
import { PopoverModule,ModalModule  } from 'ngx-bootstrap';
import {HttpService} from  './utils/http.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {TinymceModule} from 'angular2-tinymce';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)],
    PublicModule,
    CommonModule,
    AppRoutingModule,
    ModalModule,
    DashboardModule,
    QuestionnaireModule,
    CandidateModule,
    SlimLoadingBarModule.forRoot(),
    TinymceModule.withConfig({})
  ],
  declarations: [
    AppComponent
  ],
  providers:[HttpService],
  bootstrap: [ AppComponent],
  exports: [SlimLoadingBarModule]
})
export class AppModule { }
