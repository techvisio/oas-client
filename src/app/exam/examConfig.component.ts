import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { ExamService, ExamDetail } from './exam.service';

@Component({
  templateUrl: './examConfig.component.html',
  styleUrls: ['./examConfig.component.css']
})
export class examConfigComponent implements OnInit {

  public masterData: any = {
    data: {}
  };
  examAvailability: any[] = [];
  examDuration: any[] = [];
  orderOfQuestions: any[] = [];
  resultReportType: any[] = [];
  resultType: any[] = [];
  minimumPassingScore: any[] = [];
  scoring: any[] = [];
  questions: any[] = [];
  negativeMarking = false;
  negCustomMarks: number;


  @ViewChild('customPoint') public customPoint: ModalDirective;
  questionnaireId: number;
  public examData: ExamDetail = new ExamDetail();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService,
    private questionnaireService: QuestionnaireService,
    private service: ExamService
  ) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });

    this.questionnaireService.getMasterData('examduration').then(response => {
      if (response.status === 'success') {
        this.examDuration = response.data;
        console.log(this.examDuration);
      }
    });

    this.questionnaireService.getMasterData('examavailability').then(response => {
      if (response.status === 'success') {
        this.examAvailability = response.data;
        console.log(this.examAvailability);
      }
    });

    this.questionnaireService.getMasterData('resulttype').then(response => {
      if (response.status === 'success') {
        this.resultType = response.data;
        console.log(this.resultType);
      }
    });

    this.questionnaireService.getMasterData('orderofquestions').then(response => {
      if (response.status === 'success') {
        this.orderOfQuestions = response.data;
        console.log(this.orderOfQuestions);
      }
    });

    this.questionnaireService.getMasterData('resultreporttype').then(response => {
      if (response.status === 'success') {
        this.resultReportType = response.data;
        console.log(this.resultReportType);
      }
    });

    this.questionnaireService.getMasterData('minimumpassingscore').then(response => {
      if (response.status === 'success') {
        this.minimumPassingScore = response.data;
        console.log(this.minimumPassingScore);
      }
    });

    this.questionnaireService.getMasterData('scoring').then(response => {
      if (response.status === 'success') {
        this.scoring = response.data;
        console.log(this.scoring);
      }
    });

  }

  sendToAddStudentsPage() {
    var url = 'exam/:qnrId/addCandidates/:examId';
    var newUrl = url.replace(/:qnrId/i, this.questionnaireId.toString());
    newUrl = newUrl.replace(/:examId/i, this.examData.examId.toString());
    this.router.navigate([newUrl]);
  }

  createExam() {
    var context = this;
    context.examData.clientId = this.sharedService.getCurrentUser().clientId;
    context.service.createExam(context.examData).then(response => {
      if (response.status === 'success') {
        context.examData = response.data;
        context.sendToAddStudentsPage();
      }
    });
  }

  setCustomMarks() {
    var context = this;
    var questions = [];

    for (var i = 0; i < this.questions.length; i++) {
      var question = { "questionId": this.questions[i]._id, "marks": this.questions[i].marks, "negMarks": 0 };
      if (context.negativeMarking) {
        question.negMarks = this.questions[i].negMarks;
      }
      questions.push(question);
    }
    context.examData.questions = questions;
    context.customPoint.hide();
  }

  getQuestions() {
    var context = this;
    context.questionnaireService.getQuestionsByQuestionnaireId(context.questionnaireId).then(response => {
      if (response.status === 'success') {
        context.questions = response.data;
        context.questions.forEach(function (question) {
          question.negMarks = 1;
        });
      }
    });
  }

  setCustomMarkingToCurrentQuestions() {
    var context = this;
    if (context.examData.questions && context.examData.questions.length > 0) {
      context.examData.questions.forEach(function (configQues) {
        this.questions.forEach(function (question) {
          if (question._id === configQues.questionId) {
            question.marks = configQues.marks;
          }
        });
      });
    }
  }

  toggleNegativeCheckbox() {
    this.negativeMarking = !this.negativeMarking;
  }
  calculateNegativeMarking() {
    var context = this;
    context.questions.forEach(function (ques) {
      var negMark = (ques.marks * context.negCustomMarks) / 100;
      ques.negMarks = negMark;
    });
  }



  createPassingScoreMasterData(score) {
    var context = this;
    var dataName = "minimumpassingscore"
    context.masterData.data.value = score;

    context.questionnaireService.updateMasterData(context.masterData, dataName).then(response => {
      if (response.status === 'success') {
        this.minimumPassingScore = response.data.data;
      }
    });

  }

  showCustomQuesModal() {
    this.customPoint.show();
    this.setCustomMarkingToCurrentQuestions();
  }
}
