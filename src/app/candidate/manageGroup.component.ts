import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateGroupDetail } from './candidate.service';

@Component({
  templateUrl: './manageGroup.component.html',
  styleUrls: ['./manageGroup.component.css']
})

export class manageGroupComponent {

  public groupToDlt: CandidateGroupDetail = new CandidateGroupDetail();
  groups = [];
  groupNameSelected: string;


  pageFrom: number;
  pageTo: number;

  public maxSize: number = 5;
  public bigTotalItems: number;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;
  public itemsPerPage: number = 8;
  @ViewChild('deleteCandidateGroupModal') public deleteCandidateGroupModal: ModalDirective;



  public filters =
  {
    groupName: "",
    pageSize: this.itemsPerPage,
    pageNo: 1,
    pageTo: this.pageTo,
    pageFrom: this.pageFrom
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {
    this.getFiltteredCandidateGroups();

  }

  addFilter() {

    if (this.groupNameSelected || this.groupNameSelected == "") {
      this.filters.groupName = this.groupNameSelected;
    }

    this.filters.pageTo = this.pageTo;
    this.filters.pageFrom = this.pageFrom;
  }

  getFiltteredCandidateGroups() {
    this.addFilter();
    this.service.getFiltteredCandidateGroups(this.filters).then(response => {
      if (response.status === 'success') {
        this.bigTotalItems = response.data.count;
        this.groups = response.data.foundCandidateGroups;
        console.log(response.data);
      }
    });
  }

  public pageChanged(event: any): void {
    this.filters.pageNo = event.page;
    this.filters.pageSize = this.itemsPerPage;
    this.getFiltteredCandidateGroups();
  }

  redirectToCandidateGroupScreen(candidateGroupId) {
    const url = 'group/:groupId';
    var newUrl = url;
    var newUrl = newUrl.replace(/:groupId/i, candidateGroupId.toString());
    this.router.navigate([newUrl]);

  }
  deleteCandidateGroup() {
    this.service.deleteCandidateGroup(this.groupToDlt).then(response => {
      if (response.status === 'success') {
        this.deleteCandidateGroupModal.hide();
        this.getFiltteredCandidateGroups();
      }
    });
  }

  showDeleteGroupModal(group) {
    this.groupToDlt = group;
    this.deleteCandidateGroupModal.show();
  }

}

