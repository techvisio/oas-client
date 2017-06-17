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
  templateUrl: './questionnaireImport.component.html',
  styleUrls: ['./questionnaireImport.component.css']
})
export class QuestionnaireImportComponent implements OnInit {


  @ViewChild('questionPreview') public questionPreviewForm: ModalDirective;
  titleSelected: string;
  questionnaireId: number;
  questionnaire = {};
  public questions: any[];
  public questionsToImport: any[] = [];
  public isCollapsed: boolean = false;
  public sections: any[] = [];
  public categories: any[] = [];
  public difficulties: any[] = [
    {
      value: "Easy",
      isSelected: false
    },
    {
      value: "Medium",
      isSelected: false
    },
    {
      value: "Hard",
      isSelected: false
    }
  ];

  public questionTypes: any[] = [
    {
      key: "TRUE_FALSE",
      value: "True & False",
      isSelected: false
    },
    {
      key: "MULTIPLE_CHOICE_SINGLE",
      value: "Multiple Choice(Single)",
      isSelected: false
    },
    {
      key: "MULTIPLE_CHOICE_MULTI",
      value: "Multiple Choice(Multi)",
      isSelected: false
    },
    {
      key: "FILL_IN_THE_BLANK",
      value: "Fill in the Blank",
      isSelected: false
    }
  ];
  public filters =
  {
    sections: [],
    categories: [],
    difficulties: [],
    questionTypes: [],
    title: "",
    pageSize: 5,
    pageNo: 1

  };
  public customSectionSelected: any;
  public customCategorySelected: any;

  public isDifficultyCollapsed: boolean = true;
  public isQuestionCollapsed: boolean = true;
  public isSectionCollapsed: boolean = true;
  public isCategoryCollapsed: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionnaireService,
    private sharedService: sharedService
  ) { }


  public maxSize: number = 5;
  public bigTotalItems: number = 100;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;

  public pageChanged(event: any): void {
    this.filters.pageNo = event.page;
    this.filters.pageSize = event.itemsPerPage;
    this.getFiltteredQuestions();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.questionnaireId = params['qnrId'];
    });


    this.service.getMasterData('section').then(response => {
      if (response.status === 'success') {
        this.sections = response.data.data;
      }
    });

    this.service.getMasterData('category').then(response => {
      if (response.status === 'success') {
        this.categories = response.data.data;
      }
    });
    this.service.getQuestionnaireById(this.questionnaireId).then(response => {
      if (response.status === 'success') {
        this.questionnaire = response.data;
        console.log(this.questionnaire);
      }
    });

    this.route.params.subscribe(params => {
      // this.questionnaireId = params['qnrId'];
    });
  }
  public customSelected: any;
  markSelected() {
    console.log(this.customSelected);
  }

  redirectQuestionScreen() {
    const url = 'qnr/qnrId/question';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, this.questionnaireId.toString());
    this.router.navigate([newUrl]);

  }


  addFilter() {
    var filterSection = [];
    var filterCategory = [];
    var filterQuestionType = [];
    var filterDifficulty = [];

    this.sections.forEach(function (section, i) {
      if (section.isSelected) {
        filterSection.push(section.key);
      }
    });
    this.filters.sections = filterSection;

    this.categories.forEach(function (category, i) {
      if (category.isSelected) {
        filterCategory.push(category.key);
      }
    });
    this.filters.categories = filterCategory;

    this.difficulties.forEach(function (difficulty, i) {
      if (difficulty.isSelected) {
        filterDifficulty.push(difficulty.value);
      }
    });
    this.filters.difficulties = filterDifficulty;

    this.questionTypes.forEach(function (quesType, i) {
      if (quesType.isSelected) {
        filterQuestionType.push(quesType.key);
      }
    });
    this.filters.questionTypes = filterQuestionType;
    if (this.titleSelected) {
      this.filters.title = this.titleSelected;
    }
  }

  addQuestionsToImport() {
    var _this = this;
    _this.questionsToImport = [];
    _this.questions.forEach(function (question, i) {
      if (question.selectForImport) {
        _this.questionsToImport.push(question);
      }
    });
  }

  importQuestions() {
    var _this = this;
    _this.addQuestionsToImport();
    _this.service.importQuestions(_this.questionsToImport, _this.questionnaireId).then(response => {
      if (response.status === 'success') {
        _this.redirectQuestionScreen();
      }
    });
  }

  getFiltteredQuestions() {
    this.addFilter();
    this.service.getFiltteredQuestions(this.filters).then(response => {
      if (response.status === 'success') {
        this.bigTotalItems = response.data.count;
        this.questions = response.data.foundQuestions;
      }
    });
  }

  getIconBasedOnQuesType(questionType) {
    if (questionType === "TRUE_FALSE") {
      return "../../assets/images/imp-t-f.png";
    }
    if (questionType === "MULTIPLE_CHOICE_SINGLE") {
      return "../../assets/images/imp-m-c-s.png";
    }
    if (questionType === "FILL_IN_THE_BLANK") {
      return "../../assets/images/imp-f-i-t-b.png";
    }
    if (questionType === "MULTIPLE_CHOICE_MULTI") {
      return "../../assets/images/imp-m-c-m.png";
    }

  }

  showQuesPreviewModel() {

    this.questionPreviewForm.show();
  }

}

