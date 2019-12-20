import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { of, Observable } from 'rxjs';
import { FakeData } from './fake-data';
import { Question } from './models/question';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowApiService {
  apiRoot = 'https://api.stackexchange.com/2.2/';

  constructor(private http: HttpClient) {
  }

  getLatestQuestions() {
    let observable: Observable<Question[]>;
    if (environment.production) {
      observable = this.http.get<any>(`${this.apiRoot}questions/`, {
        params: {
          page: '1',
          pageSize: '10',
          fromdate: '1576281600', // todo: make dynamic
          order: 'desc',
          sort: 'creation',
          tagged: 'android',
          site: 'stackoverflow',
          filter: 'withbody'
        }
      }).pipe(map<any, Question[]>(response => {
        return response.items;
      }));
    } else {
      observable = of(FakeData.newestQuestions as Question[]);
    }

    return observable;
  }

  getQuestionThread(id: number) {
    let question = FakeData.newestQuestions.find(q => q.question_id === id);
    question.answers = FakeData.answersOfAQuestions;

    return of(question);
  }

  private fillAnswers(question: Question) {
    this.http.get<any>(`${this.apiRoot}questions/${question.question_id}/answers`, {
      params: {
        order: 'desc',
        sort: 'activity',
        site: 'stackoverflow',
        filter: 'withbody'
      }
    }).subscribe(response => {
      question.answers = response.items;
      console.log(question);
    });
  }
}
