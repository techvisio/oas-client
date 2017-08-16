import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateDetail } from '../candidate/candidate.service';

@Component({
  templateUrl: './examAddCandidates.component.html',
  styleUrls: ['./examAddCandidates.component.css']
})
export class examAddCandidatesComponent implements OnInit {

  public candidateGroups: any[] = [];
  public candidates: any[] = [];
  public candidatesSelectedForExam: any[] = [];
  public customGroupSelected: any;
  public customCandidateSelected: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {
    this.getCandidateGroups();
    this.getCandidates();
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


}

