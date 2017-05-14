import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionDetail, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
    //  @HostBinding('@routeAnimation') routeAnimation = true;
    //@HostBinding('style.display')   display = 'block';
    //@HostBinding('style.position')  position = 'absolute';

    questionData: QuestionDetail = new QuestionDetail();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: QuestionnaireService,
        private sharedService: sharedService
    ) { }

    ngOnInit() {
        this.route.params
    }

    saveQuestionnaire() {
        this.service.saveQuestionnaire(this.questionData).then(response => {
            if (response.status === 'success') {
                this.router.navigate(['/organisor/home']);
            }
        });
    }

}
