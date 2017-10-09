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

  saveButtonText = 'Save';
  public candidateGroupData: CandidateGroupDetail = new CandidateGroupDetail();
  public candidates: any[] = [];
  public selectedAvailableCandidates = [];
  public selectedAssignedCandidates = [];
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
    this.getCandidates();
    if (this.candidateGroupId) {
      this.getCandidateGroupById();
    }

  }


  addAvailableCandidateToGroup() {

    var context = this;
    context.selectedAvailableCandidates.forEach(function (selectedCandidate) {
      context.assignedCandidates.push(selectedCandidate);
    });

    context.removeAvailableCandidate(context.assignedCandidates);
    context.selectedAvailableCandidates = [];
  }

  removeAssignedCandidateFromGroup() {

    var context = this;
    context.selectedAssignedCandidates.forEach(function (selectedCandidate) {
      context.candidates.push(selectedCandidate);
    });

    context.removeAssaigndCandidate(context.candidates);
    context.selectedAssignedCandidates = [];
  }

  removeAvailableCandidate(candidatesToRemove) {
    var context = this;
    candidatesToRemove.forEach(function (selectedCandidate) {
      context.candidates.forEach(function (candidate, index) {
        if (selectedCandidate.candidateId === candidate.candidateId) {
          context.candidates.splice(index, 1);
        }
      });
    });
  }

  removeAssaigndCandidate(candidatesToRemove) {
    var context = this;
    candidatesToRemove.forEach(function (selectedCandidate) {
      context.assignedCandidates.forEach(function (candidate, index) {
        if (selectedCandidate.candidateId === candidate.candidateId) {
          context.assignedCandidates.splice(index, 1);
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
    context.removeAvailableCandidate(context.assignedCandidates);
  }

  createCandidateGroup() {
    this.saveButtonText = 'saving...'
    if (!this.candidateGroupData.candidateGroupId) {
      this.candidateGroupData.clientId = this.sharedService.getCurrentUser().clientId;
      this.candidateGroupData.candidates = this.assignedCandidates;
      this.service.createCandidateGroup(this.candidateGroupData).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.candidateGroupData = response.data;
          this.addCandidateToAssignedCandidates();
        }
      });
    }
    else {
      this.candidateGroupData.candidates = this.assignedCandidates;
      this.service.updateCandidateGroup(this.candidateGroupData).then(response => {
        if (response.status === 'success') {
          this.candidateGroupData = response.data;
          this.addCandidateToAssignedCandidates();
          this.saveButtonText = 'Save';
        }
      });
    }
  }

  getCandidates() {
    var data = { isActive: true };
    this.service.getCandidates(data).then(response => {
      if (response.status === 'success') {
        this.candidates = response.data;
        console.log(this.candidates)
      }
    });
  }

  getCandidateGroupById() {

    this.service.getCandidateGroupById(this.candidateGroupId).then(response => {
      if (response.status === 'success') {
        this.candidateGroupData = response.data;
        this.addCandidateToAssignedCandidates();

      }
    });
  }
}

