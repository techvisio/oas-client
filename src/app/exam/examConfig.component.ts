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

  examAvailability: any[] = [];
  examDuration: any[] = [];
  orderOfQuestions: any[] = [];
  resultReportType: any[] = [];
  resultType: any[] = [];
  @ViewChild('customPoint') public customPoint: ModalDirective;
  public examData:ExamDetail = new ExamDetail();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService,
    private questionnaireService: QuestionnaireService,
    private service: ExamService
  ) { }

  ngOnInit() {


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

  }

  sendToAddStudentsPage() {

    this.router.navigate(['exam/addCandidates']);
  }
}

