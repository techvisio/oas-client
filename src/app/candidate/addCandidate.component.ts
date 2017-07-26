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
  public selectedGroups = [];
  public assignedGroup = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {
    this.getCandidateGroups();
  }

  addGroupToCandidate() {
    var context = this;
    context.selectedGroups.forEach(function (selectedGroup) {
      context.assignedGroup.push(selectedGroup);
    });
    context.removeGroup(context.selectedGroups);
  }

  removeGroup(groupToRemove) {
    var context = this;
    groupToRemove.forEach(function (selectedGroup) {
      context.candidateGroups.forEach(function (group, index) {
        if (selectedGroup.candidateGroupId === group.candidateGroupId) {
          context.candidateGroups.splice(index, 1);
        }
      });
    });
  }
  
  addGroupToAssignedGroup() {
    var context = this;
    context.candidateData.candidateGroups.forEach(function (candidateGroup) {
      context.candidateGroups.forEach(function (group, index) {
        if (candidateGroup._id === group._id) {
          context.assignedGroup.push(group);
        }
      });
    });
    context.removeGroup(context.assignedGroup);

  }

  createCandidate() {
    this.candidateData.clientId = this.sharedService.getCurrentUser().clientId;
    this.candidateData.candidateGroups = this.assignedGroup;
    this.service.createCandidate(this.candidateData).then(response => {
      if (response.status === 'success') {
        this.candidateData = response.data;
        this.addGroupToAssignedGroup();
      }
    });
  }

  getCandidateGroups() {
    var data = {};
    this.service.getCandidateGroups(data).then(response => {
      if (response.status === 'success') {
        this.candidateGroups = response.data;
        console.log(this.candidateGroups);
      }
    });
  }
public isDifficultyCollapsed: boolean = true;
  public isQuestionCollapsed: boolean = true;
  public isSectionCollapsed: boolean = true;
  public isCategoryCollapsed: boolean = true;

}

