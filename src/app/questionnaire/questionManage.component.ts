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
  templateUrl: './questionManage.component.html',
  styleUrls: ['./questionManage.component.css']
})
export class QuestionManageComponent implements OnInit {


  @ViewChild('questionPreview') public questionPreviewForm: ModalDirective;
  titleSelected: string;
  questionnaireId: number;
  questionId: number;
  questionnaire = {};
  questionModal = {};
  public questions: any[];
  public questionsForQnr: any[] = [];
  public isCollapsed: boolean = false;
  public sections: any[] = [];
  public categories: any[] = [];
  public itemsPerPage: number = 6;
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
    pageSize: this.itemsPerPage,
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
  public bigTotalItems: number;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;

  public pageChanged(event: any): void {
    this.filters.pageNo = event.page;
    this.filters.pageSize = this.itemsPerPage;
    this.getFiltteredQuestions();
  }

  ngOnInit() {

    this.getFiltteredQuestions();
    
  }

  markSectionSelected(selectedSection) {

    if (this.sections && this.sections.length > 0) {
      this.sections.forEach(function (section, i) {
        if (section.value === selectedSection) {
          section.isSelected = true;
        }
      });
    }
  }

  markCategorySelected(selectedCategory) {
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach(function (category, i) {
        if (category.value === selectedCategory) {
          category.isSelected = true;
        }
      });
    }
  }

  redirectQuestionnaireScreen(questionnaireId) {
    const url = 'qnr/qnrId/update';
    var newUrl = url;
    var newUrl = newUrl.replace(/qnrId/i, questionnaireId.toString());
    this.router.navigate([newUrl]);

  }

redirectToNewQuesScreen() {
      
    this.router.navigate(['question/new']);

  }


  addFilter() {
    var filterSection = [];
    var filterCategory = [];
    var filterQuestionType = [];
    var filterDifficulty = [];
    if (this.sections && this.sections.length > 0) {
      this.sections.forEach(function (section, i) {
        if (section.isSelected) {
          filterSection.push(section.key);
        }
      });
      this.filters.sections = filterSection;
    }
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach(function (category, i) {
        if (category.isSelected) {
          filterCategory.push(category.key);
        }
      });
    }
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
    if (this.titleSelected || this.titleSelected=="") {
      this.filters.title = this.titleSelected;
    }
  }

  addQuestionsForQnr() {
    var _this = this;
    _this.questionsForQnr = [];
    _this.questions.forEach(function (question, i) {
      if (question.selectForQnr) {
        _this.questionsForQnr.push(question._id);
      }
    });
  }

  createQnrFromQuestions() {
    var context = this;
    context.addQuestionsForQnr();
    context.service.createQnrFromQuestions(context.questionsForQnr).then(response => {
      if (response.status === 'success') {
        context.redirectQuestionnaireScreen(response.data.questionnaireId);
      }
    });
  }

  getFiltteredQuestions() {
    this.addFilter();
    this.service.getFiltteredQuestions(this.filters).then(response => {
      if (response.status === 'success') {
        this.bigTotalItems = response.data.count;
        this.questions = response.data.foundQuestions;
        this.filters.pageNo = 1;
        for (var i = 0; i < this.questions.length; i++) {
          this.questions[i].questionDesc = this.stripHtmlTags(this.questions[i].questionDesc);
        }

        for (var i = 0; i < this.questions.length; i++) {
          if (this.questions[i].questionDesc.length > 80) {
            var trimmedTitle = this.questions[i].questionDesc.substring(0, 70) + '....';
            this.questions[i].questionDesc = trimmedTitle;
          }
        }
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

  showQuesPreviewModel(question) {
    this.questionModal = question;
    this.questionPreviewForm.show();
  }


   redirectQuestionScreen(questionId) {
    const url = 'question/quesId/update';
    var newUrl = url;
    var newUrl = newUrl.replace(/quesId/i, questionId.toString());
    this.router.navigate([newUrl]);

  }

  stripHtmlTags(textToStrip) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = textToStrip;
    return tmp.textContent || tmp.innerText || "";
  }

}

