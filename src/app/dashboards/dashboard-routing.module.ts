import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganisorDashboardComponent} from './organisor.component';

const dashboardRoutes: Routes = [
    { path: "organisor",  component: OrganisorDashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(dashboardRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
