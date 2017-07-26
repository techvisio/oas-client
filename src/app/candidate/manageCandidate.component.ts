import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './manageCandidate.component.html',
  styleUrls: ['./manageCandidate.component.css']
})
export class manageCandidateComponent {

  public isDifficultyCollapsed: boolean = true;
  public isQuestionCollapsed: boolean = true;
  public isSectionCollapsed: boolean = true;
  public isCategoryCollapsed: boolean = true;
  
}

