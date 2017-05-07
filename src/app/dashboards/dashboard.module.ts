import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { DashboardRoutingModule } from './dashboard-routing.module';
import {OrganisorDashboardComponent} from './organisor.component';

@NgModule({
  imports: [  
    BrowserModule,
    BrowserAnimationsModule,
    DashboardRoutingModule
  ],
  declarations: [
  OrganisorDashboardComponent
  ],
  providers: [  ]
})
export class DashboardModule { }
