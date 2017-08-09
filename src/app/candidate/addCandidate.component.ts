import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateDetail } from './candidate.service';

@Component({
  templateUrl: './addCandidate.component.html',
  styleUrls: ['./addCandidate.component.css']
})
export class addCandidateComponent {

  public candidateData: CandidateDetail = new CandidateDetail();
  public candidateGroups: any[] = [];
  public selectedAvailableGroups = [];
  public selectedAssignedGroups = [];
  public assignedGroup = [];
  candidateId;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.candidateId = params['candidateId'];
    });

    if (this.candidateId) {
      this.getCandidateById();
    }
    this.getCandidateGroups();
  }

  addAvailableGroupToCandidate() {
    var context = this;
    context.selectedAvailableGroups.forEach(function (selectedGroup) {
      context.assignedGroup.push(selectedGroup);
    });
    context.removeAvailableGroup(context.assignedGroup);
    context.selectedAvailableGroups = [];
  }

  removeAssignedGroupFromCandidate() {
    var context = this;
    context.selectedAssignedGroups.forEach(function (selectedGroup) {
      context.candidateGroups.push(selectedGroup);
    });
    context.removeAssignedGroup(context.candidateGroups);
    context.selectedAssignedGroups = [];
  }

  removeAvailableGroup(groupToRemove) {
    var context = this;
    groupToRemove.forEach(function (selectedGroup) {
      context.candidateGroups.forEach(function (group, index) {
        if (selectedGroup.candidateGroupId === group.candidateGroupId) {
          context.candidateGroups.splice(index, 1);
        }
      });
    });
  }

  removeAssignedGroup(groupToRemove) {
    var context = this;
    groupToRemove.forEach(function (selectedGroup) {
      context.assignedGroup.forEach(function (group, index) {
        if (selectedGroup.candidateGroupId === group.candidateGroupId) {
          context.assignedGroup.splice(index, 1);
        }
      });
    });
  }

  addGroupToAssignedGroup() {
    var context = this;
    context.candidateData.candidateGroups.forEach(function (candidateGroup) {
      context.candidateGroups.forEach(function (group, index) {
        if (candidateGroup === group._id) {
          context.assignedGroup.push(group);
        }
      });
    });
    context.removeAvailableGroup(context.assignedGroup);

  }

  createCandidate() {

    if (!this.candidateData.candidateId) {
      this.candidateData.clientId = this.sharedService.getCurrentUser().clientId;
      this.candidateData.candidateGroups = this.assignedGroup;
      this.service.createCandidate(this.candidateData).then(response => {
        if (response.status === 'success') {
          this.candidateData = response.data;
          this.addGroupToAssignedGroup();
        }
      });
    }
    else {

      this.candidateData.candidateGroups = this.assignedGroup;
      this.service.updateCandidate(this.candidateData).then(response => {
        if (response.status === 'success') {
          this.candidateData = response.data;
          this.addGroupToAssignedGroup();
        }
      });
    }

  }

  getCandidateGroups() {
    var data = { isActive: true };
    this.service.getCandidateGroups(data).then(response => {
      if (response.status === 'success') {
        this.candidateGroups = response.data;
        console.log(this.candidateGroups);
      }
    });
  }

  getCandidateById() {

    this.service.getCandidateById(this.candidateId).then(response => {
      if (response.status === 'success') {
        this.candidateData = response.data;
        this.addGroupToAssignedGroup();

      }
    });
  }



}

