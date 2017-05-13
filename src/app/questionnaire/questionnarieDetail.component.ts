import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {sharedService} from '../common/shared.service';
import {Question} from './questionnaireSummary.service';

@Component({
  templateUrl:'./questionnarieDetail.component.html',
  styleUrls:['./questionnarieDetail.component.css']
})

export class QuestionnaireDetailComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

 public currentQuestion:Question=new Question();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: sharedService
  ) {}

 ngOnInit() {
     this.route.params
     
    }
    
    createQuestion(questionType){
        this.currentQuestion=new Question();
        this.currentQuestion.type=questionType;
    }

}
