import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateDetail } from '../candidate/candidate.service';
import { QuestionnaireService, QuestionnaireDetail } from '../questionnaire/questionnaire.service';
import { ExamService, ExamDetail } from './exam.service';

@Component({
  templateUrl: './examAddCandidates.component.html',
  styleUrls: ['./examAddCandidates.component.css']
})
export class examAddCandidatesComponent implements OnInit {

  public candidateGroups: any[] = [];
  public candidates: any[] = [];
  public candidatesSelectedForExam: any[] = [];
  public candidateList: any[] = [];
  public customGroupSelected: any;
  public customCandidateSelected: any;

  questionnaireId: number;
  examId: number;
  questionnaireData: QuestionnaireDetail = new QuestionnaireDetail();
  examData: ExamDetail = new ExamDetail();

  @ViewChild('candidateModal') candidateModal: ModalDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private sharedService: sharedService,
    private questionnaireService: QuestionnaireService,
    private service: ExamService

  ) {
    this.candidateList.push(new CandidateDetail());
  }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });

    this.route.params.subscribe(params => {
      this.examId = params['examId'];
    });

    this.getCandidateGroups();
    this.getCandidates();
    this.getQuestionnaireById();
    this.getExamById();
  }

  getCandidates() {
    var data = { isActive: true };
    var context = this;
    context.candidateService.getCandidates(data).then(response => {
      if (response.status === 'success') {
        context.candidates = response.data;
        context.candidates.forEach(function (candidate) {
          candidate.isSelected = false;
        });
        console.log(context.candidates)
      }
    });
  }

  getCandidateGroups() {
    var context = this;
    var data = { isActive: true };
    context.candidateService.getCandidateGroups(data).then(response => {
      if (response.status === 'success') {
        context.candidateGroups = response.data;
        context.candidateGroups.forEach(function (group) {
          group.isSelected = false;
        });
        console.log(context.candidateGroups);
      }
    });
  }

  markGroupSelected(selectedGroup) {
    var context = this;
    if (context.candidateGroups && context.candidateGroups.length > 0) {
      context.candidateGroups.forEach(function (group, i) {
        if (group.groupName === selectedGroup) {
          group.isSelected = true;

          context.pushCandidateFromGroupSection(group);
        }
      });
    }
  }

  markCandidateSelected(selectedCandidate) {
    var context = this;
    if (context.candidates && context.candidates.length > 0) {
      context.candidates.forEach(function (candidate, i) {
        if (candidate.firstName === selectedCandidate) {
          candidate.isSelected = true;
          context.pushCandidateFromCandidateSection(candidate);
        }
      });
    }
  }

  pushCandidateFromCandidateSection(candidate) {
    var context = this;
    if (candidate.isSelected) {
      context.removeExistingCandidateFromCandidatesSelectedForExam(candidate);
      context.candidatesSelectedForExam.push(candidate);
    }
    context.removeCandidateFromCandidatesSelectedForExam(candidate);
  }

  pushCandidateFromGroupSection(group) {
    var context = this;
    if (group.isSelected) {
      group.candidates.forEach(function (candidate) {
        context.candidates.forEach(function (cand) {
          if (cand._id === candidate) {
            context.removeExistingCandidateFromCandidatesSelectedForExam(cand);
            context.candidatesSelectedForExam.push(cand);

          }
        });

      });
    }
    context.removeGroupFromCandidatesSelectedForExam(group);
  }

  removeCandidateFromCandidatesSelectedForExam(candidate) {
    var context = this;
    context.candidatesSelectedForExam.forEach(function (selectedCandidate, index) {

      if (candidate.candidateId === selectedCandidate.candidateId && (!candidate.isSelected)) {
        context.candidatesSelectedForExam.splice(index, 1);
      }
    });
  }

  removeGroupFromCandidatesSelectedForExam(group) {
    var context = this;

    if (!group.isSelected) {
      group.candidates.forEach(function (candidateId) {
        context.candidatesSelectedForExam.forEach(function (selectedCandidate, index) {
          if (candidateId === selectedCandidate._id) {
            context.candidatesSelectedForExam.splice(index, 1);
          }
        });

      });
    }
  }

  removeExistingCandidateFromCandidatesSelectedForExam(candidate) {
    var context = this;
    context.candidatesSelectedForExam.forEach(function (selectedCandidate, index) {

      if (selectedCandidate._id === candidate._id) {
        context.candidatesSelectedForExam.splice(index, 1);
      }
    });

  }
  addCandidate() {
    this.candidateList.push(new CandidateDetail());

  }
  removeOption(index) {
    this.candidateList.splice(index, 1);

  }

  getQuestionnaireById() {
    var context = this;
    context.questionnaireService.getQuestionnaireById(context.questionnaireId).then(response => {
      if (response.status === 'success') {
        context.questionnaireData = response.data;
      }
    });
  }

  getExamById() {
    var context = this;
    context.service.getExamById(context.examId).then(response => {
      if (response.status === 'success') {
        context.examData = response.data;
      }
    });
  }

  updateExam() {
    var context = this;
    context.examData.candidates = context.candidatesSelectedForExam;
    context.service.updateExam(context.examData).then(response => {
      if (response.status === 'success') {
        context.examData = response.data;
      }
    });
  }

  quickAddCandidate() {
    var context = this;
    context.service.quickAddCandidate(context.candidateList).then(response => {
      if (response.status === 'success') {
        var savedCandidates = response.data;
        savedCandidates.forEach(function (candidate) {
          context.candidatesSelectedForExam.push(candidate);
        });
      }
    });
  }

}

