import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { of, Observable } from 'rxjs';
import { FakeData } from './fake-data';
import { Question } from '../models/question';
import * as _ from 'lodash';
import { StackOverflowDataSource } from './stack-overflow-data-source';
import { HttpStackOverflowDataSource } from './http-stack-overflow-data-source';
import { FakeStackOverflowDataSource } from './fake-stack-overflow-data-source';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowApiService {
  dataSource: StackOverflowDataSource;
  constructor(http: HttpClient) {
    this.dataSource = environment.production ?
      new HttpStackOverflowDataSource(http) :
      new FakeStackOverflowDataSource();
  }

  getLatestQuestions() {
    return this.dataSource.getLatestQuestions();
  }

  getQuestionThread(id: number) {
    return this.dataSource.getQuestionThread(id);
  }
}
