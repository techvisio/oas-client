import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import { PublicModule } from './public/public.module';
import { CommonModule } from './common/common.module';
import { AppRoutingModule } from './app-routing.module';
import {DashboardModule} from './dashboards/dashboard.module'
import { PopoverModule,ModalModule  } from 'ngx-bootstrap';
import {HttpService} from  './utils/http.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)],
    PublicModule,
    CommonModule,
    AppRoutingModule,
    ModalModule,
    DashboardModule
  ],
  declarations: [
    AppComponent
  ],
  providers:[HttpService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
