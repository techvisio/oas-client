import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { EqualValidator } from '../directives/equal-validator.directive';
import { ExamService } from './exam.service';
import { examConfigComponent} from './examConfig.component';
import { examAddCandidatesComponent} from './examAddCandidates.component';
import { examDashboardComponent} from './examDashboard.component';





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
  ],
  declarations: [
    examConfigComponent,
    examAddCandidatesComponent,
    examDashboardComponent
  ],
  providers: [ExamService, HttpService]
})
export class ExamModule { }

