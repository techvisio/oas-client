import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateDetail } from './candidate.service';
import { CommonResponseService } from '../common/common-response.service';

@Component({
  templateUrl: './addCandidate.component.html',
  styleUrls: ['./addCandidate.component.css']
})
export class addCandidateComponent {
  @ViewChild('fileImportInput')
  fileImportInput: any;

  csvRecords = [];

  public candidateData: CandidateDetail = new CandidateDetail();
  public candidateGroups: any[] = [];
  public candidateList: CandidateDetail[] = [];
  public selectedAvailableGroups = [];
  public selectedAssignedGroups = [];
  public assignedGroup = [];
  candidateId;
  candidateForm: NgForm;
  saveButtonText = 'Save';
  showNormalView = "true";

  private errorMsgs: any[] = [];
  private errorType: string;

  @ViewChild('candidateForm') currentForm: NgForm;
  @ViewChild('saveModal') public saveModal: ModalDirective;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService,
    private errorMessageService: CommonResponseService
  ) {
    this.candidateList.push(new CandidateDetail());
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.candidateId = params['candidateId'];
    });
    this.getCandidateGroups();
    if (this.candidateId) {
      this.getCandidateById();
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.candidateForm) { return; }
    this.candidateForm = this.currentForm;
    if (this.candidateForm) {
      this.candidateForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.candidateForm) { return; }
    const form = this.candidateForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        if (messages) {
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  formErrors = {
    'cnctName': '',
    'orgName': '',
    'emailId': '',
    //'cnctNo': '',
    'userName': '',
    'password': '',
    'confirmpassword': ''
  };

  validationMessages = {
    'cnctName': {
      'required': 'Contact Name is required.',
      'pattern': 'Contact Name is InValid.'
    },
    'orgName': {
      'required': 'Organisation Name is required.'
    },
    'emailId': {
      'required': 'Email Id is required.',
      'pattern': 'Email Id is InValid.'
    },
    /*'cnctNo': {
      'required': 'Contact No is required.',
      'pattern': 'Contact No is InValid.'
    },*/
    'userName': {
      'required': 'User name is required.',
      'pattern': 'User name is InValid.'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password should contain 1 special character, 1 upper case, 1 lower case, 1 numeric and minimum 8 characters.'
    },
    'confirmpassword': {
      'required': 'Confirm Password is required.',
      'validateEqual': 'password and confirm password are not same'
    }

  };

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
    this.saveButtonText = 'saving...'
    if (!this.candidateData.candidateId) {
      this.candidateData.clientId = this.sharedService.getCurrentUser().clientId;
      this.candidateData.candidateGroups = this.assignedGroup;
      this.service.createCandidate(this.candidateData).then(response => {
        if (response.status === 'success') {
          this.saveButtonText = 'Save';
          this.candidateData = response.data;
          this.saveModal.show();
          this.closeSaveDataSuccessModal();
          this.addGroupToAssignedGroup();
          
        }
      })
      .catch(error => {
        this.handleError(error);
      });
    }
    else {

      this.candidateData.candidateGroups = this.assignedGroup;
      this.service.updateCandidate(this.candidateData).then(response => {
        if (response.status === 'success') {
          this.candidateData = response.data;
          this.saveModal.show();
          this.closeSaveDataSuccessModal();
          this.addGroupToAssignedGroup();

          this.saveButtonText = 'Save';
        }
      });
    }

  }

    closeSaveDataSuccessModal() {
    var context = this;
    setTimeout(function () {
      context.saveModal.hide()
    }, 2000);
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
  addCandidate() {
    var context = this;
    context.candidateList.push(new CandidateDetail());
  }
  removeOption(index) {
    var context = this;
    context.candidateList.splice(index, 1);

  }

  private handleError(error: any) {
    
    var context = this;
    context.saveButtonText = 'Save';
    if (error && error.status === 'failed') {
      if (error.errType === 'CANDIDATE_VALIDATION_ERROR') {
        if (error.errorCodes && error.errorCodes.length > 0) {
          context.errorMsgs = [];
          error.errorCodes.forEach(function (errCode) {
            var errorMsg = context.errorMessageService.getMessage(errCode);
            if (errCode === 'DUPLICATE_CANDIDATE_EMAIL' && errorMsg) {
              context.formErrors.emailId = '';
              context.formErrors.emailId += errorMsg + ' ';
            }
          })
        }
        if (error.errMsg) {
          context.errorMsgs = [];
          context.errorMsgs.push(error.errMsg);
        }
      }
    }
  }
  
}

