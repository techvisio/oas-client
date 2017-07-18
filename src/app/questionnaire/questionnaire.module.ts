import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule,PaginationModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { EqualValidator } from '../directives/equal-validator.directive';
import { QuestionnaireSummaryComponent } from './questionnaireSummary.component';
import { QuestionnaireCopyComponent } from './questionnaireCopy.component';
import {guiEditorComponent} from './tinyMce.component';
import { QuestionnaireService } from './questionnaire.service'
import { QuestionnaireDetailComponent } from './questionnarieDetail.component';
import { QuestionnairePreviewComponent } from './questionnairePreview.component';
import { QuestionnaireImportComponent } from './questionnaireImport.component';
import { QuestionManageComponent } from './questionManage.component';
import { QuestionnaireManageComponent } from './questionnarieManage.component';
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
   CollapseModule.forRoot(),
   FileUploadModule
  ],
  declarations: [

    QuestionnaireSummaryComponent,
    QuestionnaireDetailComponent,
    QuestionnairePreviewComponent,
    QuestionnaireImportComponent,
    QuestionnaireManageComponent,
    QuestionManageComponent,
    QuestionnaireCopyComponent,
    guiEditorComponent
    

  ],
  providers: [QuestionnaireService, HttpService]
})
export class QuestionnaireModule { }
