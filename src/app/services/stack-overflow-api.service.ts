import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StackOverflowDataSource } from './stack-overflow-data-source';
import { HttpStackOverflowDataSource } from './http-stack-overflow-data-source';
import { FakeStackOverflowDataSource } from './fake-stack-overflow-data-source';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Question } from '../models/question';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowApiService {
  dataSource: StackOverflowDataSource;
  constructor(http: HttpClient) {
    this.dataSource = environment.useFakeData ?
      new FakeStackOverflowDataSource() :
      new HttpStackOverflowDataSource(http);
  }

  getQuestionList() {
    return forkJoin([this.dataSource.getLatestQuestions(), this.dataSource.getMostVotedQuestions()]).pipe(map(responses => {
      let all = _.unionBy(responses[0], responses[1], q => q.question_id);
      let questions = all.map(this.processPost);
      return questions;
    }))
  }

  getQuestionThread(id: number) {
    return this.dataSource.getQuestionThread(id).pipe(map(question => {
      this.processPost(question);
      question.answers.forEach(this.processPost);
      return question;
    }));
  }

  private processPost(post: any) {
    post.creation_date = moment.unix(post.creation_date).fromNow();
    post.last_activity_date = moment.unix(post.last_activity_date).fromNow();
    return post;
  }
}
