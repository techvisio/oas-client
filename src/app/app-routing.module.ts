import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './public/signup.component';
import { HomePageComponent } from './public/homepage.component';
import { LoginComponent } from './public/login.component';
import { QuestionnaireSummaryComponent } from './questionnaire/questionnaireSummary.component';
import { QuestionnaireCopyComponent } from './questionnaire/questionnaireCopy.component';
import { QuestionnaireDetailComponent } from './questionnaire/questionnarieDetail.component';
import { QuestionnaireViewComponent } from './questionnaire/questionnaireView.component';
import { QuestionnairePreviewComponent } from './questionnaire/questionnairePreview.component';
import { QuestionnaireImportComponent } from './questionnaire/questionnaireImport.component';
import { QuestionManageComponent } from './questionnaire/questionManage.component';
import { QuestionnarieHomeComponent } from './questionnaire/questionnarieHome.component';
import { QuestionnaireManageComponent } from './questionnaire/questionnarieManage.component';
import { OrganisorDashboardComponent } from './dashboards/organisor.component';
import { MasterDataComponent } from './master_data/masterData.component';
import { addCandidateComponent } from './candidate/addCandidate.component';
import { candidateGroupComponent } from './candidate/createGroup.component';
import { manageCandidateComponent } from './candidate/manageCandidate.component';
import { manageGroupComponent } from './candidate/manageGroup.component';
import { CandidateDashboardComponent } from './candidate/candidateDashboard.component';
import { examConfigComponent } from './exam/examConfig.component';
import { ExamQuestionnaireComponent } from './exam/examQuestionnarie.component';
import { examAddCandidatesComponent } from './exam/examAddCandidates.component';
import { examDashboardComponent } from './exam/examDashboard.component';
import { NewQuestionComponent } from './questionnaire/newQuestion.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "organisor/home", component: OrganisorDashboardComponent },
  { path: "master", component: MasterDataComponent },
  { path: "qnr/new", component: QuestionnaireSummaryComponent },
  { path: "qnr/:qnrId/update", component: QuestionnaireSummaryComponent },
  { path: "qnr/manage", component: QuestionnaireManageComponent },
  { path: "qnr/home", component: QuestionnarieHomeComponent },
  { path: "ques/manage", component: QuestionManageComponent },
  { path: "qnr/:qnrId", component: QuestionnaireDetailComponent },
  { path: "qnr/:qnrId/view/question", component: QuestionnaireViewComponent },
  { path: "qnr/:qnrId/question", component: QuestionnaireDetailComponent },
  { path: "qnr/:qnrId/preview", component: QuestionnairePreviewComponent },
  { path: "qnr/:qnrId/import", component: QuestionnaireImportComponent },
  { path: "qnr/:qnrId/copy/questions", component: QuestionnaireCopyComponent },
  { path: "candidate/new", component: addCandidateComponent },
  { path: "candidate/group", component: candidateGroupComponent },
  { path: "candidate/manage/candidates", component: manageCandidateComponent },
  { path: "candidate/manage/groups", component: manageGroupComponent },
  { path: "candidate/home", component: CandidateDashboardComponent },
  { path: "exam/:qnrId/config", component: examConfigComponent },
  { path: "exam/qnr", component: ExamQuestionnaireComponent },
  { path: "exam/:qnrId/addCandidates/:examId", component: examAddCandidatesComponent },
  { path: "exam/home", component: examDashboardComponent },
  { path: "question/new", component: NewQuestionComponent },
  { path: "question/:quesId/update", component: NewQuestionComponent },
  { path: "candidate/:candidateId", component: addCandidateComponent },
  { path: "group/:groupId", component: candidateGroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
