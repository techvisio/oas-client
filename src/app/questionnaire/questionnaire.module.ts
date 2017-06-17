import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule,PaginationModule } from 'ngx-bootstrap';
import { EqualValidator } from '../directives/equal-validator.directive';
import { QuestionnaireSummaryComponent } from './questionnaireSummary.component';
import { QuestionnaireService } from './questionnaire.service'
import { QuestionnaireDetailComponent } from './questionnarieDetail.component';
import { QuestionnairePreviewComponent } from './questionnairePreview.component';
import { QuestionnaireImportComponent } from './questionnaireImport.component';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
   TypeaheadModule.forRoot(),
   BsDropdownModule.forRoot(),
   CollapseModule.forRoot()
  ],
  declarations: [

    QuestionnaireSummaryComponent,
    QuestionnaireDetailComponent,
    QuestionnairePreviewComponent,
    QuestionnaireImportComponent
    

  ],
  providers: [QuestionnaireService, HttpService]
})
export class QuestionnaireModule { }
