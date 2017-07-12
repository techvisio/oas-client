import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';
import {CandidateService, CandidateDetail } from './candidate.service';

@Component({
  templateUrl: './addCandidate.component.html',
  styleUrls: ['./addCandidate.component.css']
})
export class addCandidateComponent {

public candidateData: CandidateDetail = new CandidateDetail();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CandidateService,
    private sharedService: sharedService
  ) { }
  
  createCandidate(){
    
      this.service.createCandidate(this.candidateData).then(response => {
      if (response.status === 'success') {
       this.candidateData = response.data;
      }
    });
  }

}

