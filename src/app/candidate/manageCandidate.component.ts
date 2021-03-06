import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import { CandidateService, CandidateDetail } from './candidate.service';

@Component({
  templateUrl: './manageCandidate.component.html',
  styleUrls: ['./manageCandidate.component.css']
})
export class manageCandidateComponent {

  public candidateToDlt: CandidateDetail = new CandidateDetail();
  candidates = [];
  firstNameSelected: string;
  lastNameSelected: string;
  emailIdSelected: string;
  contactNoSelected: string;
  identifierSelected: string;

  pageFrom: number;
  pageTo: number;

  public maxSize: number = 5;
  public bigTotalItems: number;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;
  public itemsPerPage: number = 8;
  @ViewChild('deleteCandidateModal') public deleteCandidateModal: ModalDirective;

  public gender: any[] = [
    {
      value: "Male",
      isSelected: false
    },
    {
      value: "Female",
      isSelected: false
    }
  ];


  public filters =
  {
    gender: [],
    firstName: "",
    lastName: "",
    emailId: "",
    contactNo: "",
    identifier: "",
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
    this.getFiltteredCandidates();

  }

  addFilter() {
    var filterGender = [];

    this.gender.forEach(function (gender, i) {
      if (gender.isSelected) {
        filterGender.push(gender.value);
      }
    });
    this.filters.gender = filterGender;

    if (this.firstNameSelected || this.firstNameSelected=="") {
      this.filters.firstName = this.firstNameSelected.trim();
    }
    if (this.lastNameSelected || this.lastNameSelected=="") {
      this.filters.lastName = this.lastNameSelected;
    }
    if (this.emailIdSelected || this.emailIdSelected=="") {
      this.filters.emailId = this.emailIdSelected;
    }
    if (this.contactNoSelected || this.contactNoSelected=="") {
      this.filters.contactNo = this.contactNoSelected;
    }
    if (this.identifierSelected || this.identifierSelected=="") {
      this.filters.identifier = this.identifierSelected;
    }
    this.filters.pageTo = this.pageTo;
    this.filters.pageFrom = this.pageFrom;
  }

  getFiltteredCandidates() {
    this.addFilter();
    this.service.getFiltteredCandidates(this.filters).then(response => {
      if (response.status === 'success') {
        this.bigTotalItems = response.data.count;
        this.candidates = response.data.foundCandidates;
        console.log(response.data);
      }
    });
  }

  public pageChanged(event: any): void {
    this.filters.pageNo = event.page;
    this.filters.pageSize = this.itemsPerPage;
    this.getFiltteredCandidates();
  }

  redirectToCandidateScreen(candidateId) {
    const url = 'candidate/:candidateId';
    var newUrl = url;
    var newUrl = newUrl.replace(/:candidateId/i, candidateId.toString());
    this.router.navigate([newUrl]);

  }
  deleteCandidate() {
    this.service.deleteCandidate(this.candidateToDlt).then(response => {
      if (response.status === 'success') {
        this.deleteCandidateModal.hide();
        this.getFiltteredCandidates();
      }
    });
  }

  showDeleteCandidateModal(candidate) {
    this.candidateToDlt = candidate;
    this.deleteCandidateModal.show();
  }

}

