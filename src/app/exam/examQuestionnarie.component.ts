import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ExamService } from './exam.service';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './examQuestionnarie.component.html',
  styleUrls: ['./examQuestionnarie.component.css']
})
export class ExamQuestionnaireComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExamService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

  }

}

