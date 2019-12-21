import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StackOverflowDataSource } from './stack-overflow-data-source';
import { HttpStackOverflowDataSource } from './http-stack-overflow-data-source';
import { FakeStackOverflowDataSource } from './fake-stack-overflow-data-source';
import * as moment from 'moment';
import { Question } from '../models/question';

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

  getLatestQuestions() {
    return this.dataSource.getLatestQuestions().pipe(map(result => {
      result.forEach(this.processQuestion)
      return result as Question[];
    }));
  }

  getQuestionThread(id: number) {
    return this.dataSource.getQuestionThread(id).pipe(map(this.processQuestion));
  }

  private processQuestion(question: any) {
    question.creation_date = moment.unix(question.creation_date).fromNow();
    question.last_activity_date = moment.unix(question.last_activity_date).fromNow();
    return question;
  }
}
