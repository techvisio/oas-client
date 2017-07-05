import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './public/signup.component';
import { HomePageComponent } from './public/homepage.component';
import { LoginComponent } from './public/login.component';
import { QuestionnaireSummaryComponent } from './questionnaire/questionnaireSummary.component';
import { QuestionnaireCopyComponent } from './questionnaire/questionnaireCopy.component';
import { QuestionnaireDetailComponent } from './questionnaire/questionnarieDetail.component';
import { QuestionnairePreviewComponent } from './questionnaire/questionnairePreview.component';
import { QuestionnaireImportComponent } from './questionnaire/questionnaireImport.component';
import { QuestionManageComponent } from './questionnaire/questionManage.component';
import { QuestionnaireManageComponent } from './questionnaire/questionnarieManage.component';
import { OrganisorDashboardComponent } from './dashboards/organisor.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "organisor/home", component: OrganisorDashboardComponent },
  { path: "qnr/new", component: QuestionnaireSummaryComponent },
  { path: "qnr/:qnrId/update", component: QuestionnaireSummaryComponent },
  { path: "qnr/manage", component: QuestionnaireManageComponent },
  { path: "ques/manage", component: QuestionManageComponent },
  { path: "qnr/:qnrId", component: QuestionnaireDetailComponent },
  { path: "qnr/:qnrId/question", component: QuestionnaireDetailComponent },
  { path: "qnr/:qnrId/preview", component: QuestionnairePreviewComponent },
  { path: "qnr/:qnrId/import", component: QuestionnaireImportComponent },
  { path: "qnr/:qnrId/copy/questions", component: QuestionnaireCopyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
