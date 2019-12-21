import { Component, OnInit } from '@angular/core';
import { StackOverflowApiService } from '../services/stack-overflow-api.service';
import { Question } from '../models/question';
import * as _ from 'lodash';

@Component({
  selector: 'ss-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questionList: Question[] = [];
  sortBy: string = 'creation_date';
  constructor(private service: StackOverflowApiService) {

  }

  ngOnInit() {
    this.service.getQuestionList().subscribe(questions => {
      this.questionList = questions;
      this.sortQuestions();
    });
  }

  sortQuestions() {
    this.questionList = _.orderBy(this.questionList, [this.sortBy], ["desc"]);
  }
}
