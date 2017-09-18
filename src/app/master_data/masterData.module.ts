import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopoverModule, ModalModule, TypeaheadModule, BsDropdownModule,PaginationModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { EqualValidator } from '../directives/equal-validator.directive';
import { MasterDataComponent } from './masterData.component';
import { MasterDataService } from './masterData.service';
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
    MasterDataComponent
      ],
  providers: [MasterDataService, HttpService]
})
export class MasterDataModule { }
