import { Component, OnInit } from '@angular/core';
import { StackOverflowApiService } from '../stack-overflow-api.service';
import { Question } from '../models/question';

@Component({
  selector: 'ss-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questionList: Question[] = [];
  constructor(private service: StackOverflowApiService) {

  }

  ngOnInit() {
    this.service.getLatestQuestions().subscribe(questions => this.questionList = questions);
  }
}
