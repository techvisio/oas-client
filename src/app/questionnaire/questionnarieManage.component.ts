import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { QuestionDetail, Answer, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './questionnarieManage.component.html',
  styleUrls: ['./questionnarieManage.component.css']
})
export class QuestionnaireManageComponent implements OnInit {

  ngOnInit() {

  }

}

