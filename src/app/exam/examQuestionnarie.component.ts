import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ExamService } from './exam.service';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './examQuestionnarie.component.html',
  styleUrls: ['./examQuestionnarie.component.css']
})
export class ExamQuestionnaireComponent implements OnInit {

  titleSelected: string;
  pageFrom: number;
  pageTo: number;
  subjects = [];
  questionnaires = [];
  qnrId: number;
  public maxSize: number = 5;
  public bigTotalItems: number;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;
  public itemsPerPage: number = 6;

  public isStatusCollapsed: boolean = true;
  public isMarksCollapsed: boolean = true;
  public isSubjectCollapsed: boolean = true;
  @ViewChild('finalizeExam') public finalizeExam: ModalDirective;

  public status: any[] = [
    {
      value: "Draft",
      isSelected: false
    },
    {
      value: "Finalised",
      isSelected: false
    }
  ];


  public filters =
  {
    subjects: [],
    status: ['Finalised'],
    title: "",
    pageSize: this.itemsPerPage,
    pageNo: 1,
    pageTo: this.pageTo,
    pageFrom: this.pageFrom
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {
    this.service.getMasterData('subject').then(response => {
      if (response.status === 'success') {
        this.subjects = response.data;
        console.log(this.subjects)
      }
    });
    this.getFiltteredQuestionnaires();
  }

  markSubjectSelected(selectedSubject) {
    if (this.subjects && this.subjects.length > 0) {
      this.subjects.forEach(function (subject, i) {
        if (subject.value === selectedSubject) {
          subject.isSelected = true;
        }
      });
    }
  }

  addFilter() {
    var filterSubject = [];
    var filterStatus = [];
    if (this.subjects && this.subjects.length > 0) {
      this.subjects.forEach(function (subject, i) {
        if (subject.isSelected) {
          filterSubject.push(subject.value);
        }
      });
    }
    this.filters.subjects = filterSubject;

    if (this.titleSelected) {
      this.filters.title = this.titleSelected;
    }
    this.filters.pageTo = this.pageTo;
    this.filters.pageFrom = this.pageFrom;
  }

  getFiltteredQuestionnaires() {
    this.addFilter();
    this.service.getFiltteredQuestionnaires(this.filters).then(response => {
      if (response.status === 'success') {
        this.bigTotalItems = response.data.count;
        this.questionnaires = response.data.foundQuestionnaires;
        this.convertUpdatedDate(this.questionnaires);
        console.log(response.data);
      }
    });

  }

  public pageChanged(event: any): void {
    this.filters.pageNo = event.page;
    this.filters.pageSize = this.itemsPerPage;
    this.getFiltteredQuestionnaires();

  }

  redirectToNewQuestionnaireScreen() {
    this.router.navigate(['qnr/new']);
  }

  redirectQuestionScreen(qnrId) {
    const url = 'qnr/qnrId/question';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, qnrId.toString());
    this.router.navigate([newUrl]);

  }

  redirectQuestionCopyScreen(qnrId) {
    const url = 'qnr/qnrId/copy/questions';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, qnrId.toString());
    this.router.navigate([newUrl]);

  }

  redirectToViewScreen(qnrId) {
    const url = 'qnr/:qnrId/view/question';
    var newUrl = url;
    var newUrl = newUrl.replace(/:qnrId/i, qnrId.toString());
    this.router.navigate([newUrl]);

  }

  redirectToPreviewScreen(qnrId) {
    const url = 'qnr/:qnrId/preview';
    var newUrl = url;
    var newUrl = newUrl.replace(/:qnrId/i, qnrId.toString());
    this.router.navigate([newUrl]);

  }

  GetFormattedDate(dateStr) {
    var date = new Date(dateStr);
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;

  }

  convertUpdatedDate(questionnaires) {
    for (var i = 0; i < questionnaires.length; i++) {
      if (questionnaires[i].updateDate) {
        questionnaires[i].updateDate = this.GetFormattedDate(questionnaires[i].updateDate);
      }
    }
  }

  inactiveQuestionnaire(questionnaire) {
    questionnaire.status = 'InActive';
    this.service.finalizeQuestionnaire(questionnaire).then(response => {
      if (response.status === 'success') {
        this.getFiltteredQuestionnaires();
      }
    });
  }

  createExam(questionnireId) {
    this.finalizeExam.show();
    this.qnrId = questionnireId;
  }
  sendToExamPage() {
    var url = 'exam/:qnrId/config';
    var newUrl = url.replace(/:qnrId/i, this.qnrId.toString());
    this.router.navigate([newUrl]);
  }

}

