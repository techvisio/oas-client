import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './public/signup.component';
import {HomePageComponent} from './public/homepage.component';
import {LoginComponent} from './public/login.component';
import {OrganisorDashboardComponent} from './dashboards/organisor.component';

const routes: Routes = [
   { path: "signup",  component: SignupComponent},
   { path: "home",  component: HomePageComponent},
   { path: "login",  component: LoginComponent},
    { path: "organisor/home",  component: OrganisorDashboardComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{ useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
