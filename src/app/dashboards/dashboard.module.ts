import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrganisorDashboardComponent} from './organisor.component';
import {MasterDataComponent} from './masterData.component';

@NgModule({
  imports: [  
    BrowserModule,
    BrowserAnimationsModule    
  ],
  declarations: [
  OrganisorDashboardComponent,
  MasterDataComponent
  ],
  providers: [  ]
})
export class DashboardModule { }
