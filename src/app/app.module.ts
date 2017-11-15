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
import {ExamModule} from './exam/exam.module';
import {MasterDataModule} from './master_data/masterData.module';
import { PopoverModule,ModalModule  } from 'ngx-bootstrap';
import { BsDropdownModule,TooltipModule  } from 'ngx-bootstrap';
import {HttpService} from  './utils/http.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


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
    ExamModule,
    MasterDataModule,
    SlimLoadingBarModule.forRoot(),
    ToastModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers:[HttpService],
  bootstrap: [ AppComponent],
  exports: [SlimLoadingBarModule]
})
export class AppModule { }
