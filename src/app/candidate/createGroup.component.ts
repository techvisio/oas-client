import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateGroupDetail } from './candidate.service';

@Component({
  templateUrl: './createGroup.component.html',
  styleUrls: ['./createGroup.component.css']
})
export class candidateGroupComponent {


  public candidateGroupData: CandidateGroupDetail = new CandidateGroupDetail();
  public candidates: any[] = [];
  public selectedCandidates = [];
  public assignedCandidates = [];
  candidateGroupId;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.candidateGroupId = params['groupId'];
    });

    if (this.candidateGroupId) {
      this.getCandidateGroupById();
    }

    this.getCandidates();
  }


  addCandidateToGroup() {

    var context = this;
    context.selectedCandidates.forEach(function (selectedCandidate) {
      context.assignedCandidates.push(selectedCandidate);
    });

    context.removeCandidate(context.assignedCandidates);
  }


  removeCandidate(candidatesToRemove) {
    var context = this;
    candidatesToRemove.forEach(function (selectedCandidate) {
      context.candidates.forEach(function (candidate, index) {
        if (selectedCandidate.candidateId === candidate.candidateId) {
          context.candidates.splice(index, 1);
        }
      });
    });
  }

  addCandidateToAssignedCandidates() {
    var context = this;
    context.candidateGroupData.candidates.forEach(function (candidate) {
      context.candidates.forEach(function (MasterCandidate, index) {
        if (candidate === MasterCandidate._id) {
          context.assignedCandidates.push(MasterCandidate);
        }
      });
    });
    context.removeCandidate(context.assignedCandidates);
  }

  createCandidateGroup() {
    this.candidateGroupData.clientId = this.sharedService.getCurrentUser().clientId;
    this.service.createCandidateGroup(this.candidateGroupData).then(response => {
      if (response.status === 'success') {
        this.candidateGroupData = response.data;
        this.addCandidateToAssignedCandidates();
      }
    });
  }

  getCandidates() {
    var data = {};
    this.service.getCandidates(data).then(response => {
      if (response.status === 'success') {
        this.candidates = response.data;
        console.log(this.candidates)
      }
    });
  }

  getCandidateGroupById() {

    this.service.getCandidateById(this.candidateGroupId).then(response => {
      if (response.status === 'success') {
        this.candidateGroupData = response.data;
        this.addCandidateToAssignedCandidates();

      }
    });
  }
}

