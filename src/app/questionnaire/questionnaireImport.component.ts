import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { QuestionDetail, Answer, QuestionnaireService } from './questionnaire.service';
import { sharedService } from '../common/shared.service';

@Component({
  templateUrl: './questionnaireImport.component.html',
  styleUrls: ['./questionnaireImport.component.css']
})
export class QuestionnaireImportComponent implements OnInit {

  questionnaireId: number;
  public isCollapsed: boolean = false;
  public sections: any[];
  public categories: any[];
  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });


    this.service.getMasterData('section').then(response => {
      if (response.status === 'success') {
        response.data.data.forEach(function (masterData, i) {
          masterData.isSelected = false;
        });
        this.sections = response.data.data;
      }
    });

    this.service.getMasterData('category').then(response => {
      if (response.status === 'success') {
        this.categories = response.data.data;
      }
    });

    this.route.params.subscribe(params => {
      // this.questionnaireId = params['qnrId'];
    });
  }

  markSelected() {
    console.log(this.customSelected);
  }

  redirectQuestionScreen() {
    const url = 'qnr/qnrId/question';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, this.questionnaireId.toString());
    this.router.navigate([newUrl]);

  }

  public customSelected: any;
  /*public statesComplex:any[] = [
    {id: 1, name: 'Alabama', region: 'South'}, {id: 2, name: 'Alaska', region: 'West'}, {id: 3, name: 'Arizona', region: 'West'},
    {id: 4, name: 'Arkansas', region: 'South'}, {id: 5, name: 'California', region: 'West'},
    {id: 6, name: 'Colorado', region: 'West'}, {id: 7, name: 'Connecticut', region: 'Northeast'},
    {id: 8, name: 'Delaware', region: 'South'}, {id: 9, name: 'Florida', region: 'South'},
    {id: 10, name: 'Georgia', region: 'South'}, {id: 11, name: 'Hawaii', region: 'West'},
    {id: 12, name: 'Idaho', region: 'West'}, {id: 13, name: 'Illinois', region: 'Midwest'},
    {id: 14, name: 'Indiana', region: 'Midwest'}, {id: 15, name: 'Iowa', region: 'Midwest'},
    {id: 16, name: 'Kansas', region: 'Midwest'}, {id: 17, name: 'Kentucky', region: 'South'},
    {id: 18, name: 'Louisiana', region: 'South'}, {id: 19, name: 'Maine', region: 'Northeast'},
    {id: 21, name: 'Maryland', region: 'South'}, {id: 22, name: 'Massachusetts', region: 'Northeast'},
    {id: 23, name: 'Michigan', region: 'Midwest'}, {id: 24, name: 'Minnesota', region: 'Midwest'},
    {id: 25, name: 'Mississippi', region: 'South'}, {id: 26, name: 'Missouri', region: 'Midwest'},
    {id: 27, name: 'Montana', region: 'West'}, {id: 28, name: 'Nebraska', region: 'Midwest'},
    {id: 29, name: 'Nevada', region: 'West'}, {id: 30, name: 'New Hampshire', region: 'Northeast'},
    {id: 31, name: 'New Jersey', region: 'Northeast'}, {id: 32, name: 'New Mexico', region: 'West'},
    {id: 33, name: 'New York', region: 'Northeast'}, {id: 34, name: 'North Dakota', region: 'Midwest'},
    {id: 35, name: 'North Carolina', region: 'South'}, {id: 36, name: 'Ohio', region: 'Midwest'},
    {id: 37, name: 'Oklahoma', region: 'South'}, {id: 38, name: 'Oregon', region: 'West'},
    {id: 39, name: 'Pennsylvania', region: 'Northeast'}, {id: 40, name: 'Rhode Island', region: 'Northeast'},
    {id: 41, name: 'South Carolina', region: 'South'}, {id: 42, name: 'South Dakota', region: 'Midwest'},
    {id: 43, name: 'Tennessee', region: 'South'}, {id: 44, name: 'Texas', region: 'South'},
    {id: 45, name: 'Utah', region: 'West'}, {id: 46, name: 'Vermont', region: 'Northeast'},
    {id: 47, name: 'Virginia', region: 'South'}, {id: 48, name: 'Washington', region: 'South'},
    {id: 49, name: 'West Virginia', region: 'South'}, {id: 50, name: 'Wisconsin', region: 'Midwest'},
    {id: 51, name: 'Wyoming', region: 'West'}];*/
}

