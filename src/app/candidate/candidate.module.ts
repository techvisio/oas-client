import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { HttpService } from '../utils/http.service';
import { sharedService } from '../common/shared.service';
import { EqualValidator } from '../directives/equal-validator.directive';
import { CandidateService } from './candidate.service';
import { addCandidateComponent } from './addCandidate.component';
import { candidateGroupComponent } from './createGroup.component';
import { manageCandidateComponent } from './manageCandidate.component';
import { manageGroupComponent } from './manageGroup.component';
import { CandidateDashboardComponent } from './candidateDashboard.component';

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
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    addCandidateComponent,
    candidateGroupComponent,
    manageCandidateComponent,
    manageGroupComponent,
    CandidateDashboardComponent
  ],
  providers: [CandidateService, HttpService]
})
export class CandidateModule { }

