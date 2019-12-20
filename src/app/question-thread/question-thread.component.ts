import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question';
import { StackOverflowApiService } from '../services/stack-overflow-api.service';

@Component({
  selector: 'ss-question-thread',
  templateUrl: './question-thread.component.html',
  styleUrls: ['./question-thread.component.scss']
})
export class QuestionThreadComponent implements OnInit {
  question: Question;

  constructor(private service: StackOverflowApiService
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.getQuestionThread(+this.route.snapshot.params['id']).subscribe(question => this.question = question);
  }
}
