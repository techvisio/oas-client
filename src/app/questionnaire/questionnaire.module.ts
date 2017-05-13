import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { PopoverModule,ModalModule  } from 'ngx-bootstrap';
import { EqualValidator } from '../directives/equal-validator.directive';
import {QuestionnaireSummaryComponent} from './questionnaireSummary.component';
import {QuestionnaireSummaryService} from './questionnaireSummary.service'
import {HttpService} from  '../utils/http.service';
import {sharedService} from '../common/shared.service';

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
    QuestionnaireSummaryComponent
  ],
  providers: [ QuestionnaireSummaryService,HttpService ]
})
export class QuestionnaireModule { }
