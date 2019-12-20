import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { of } from 'rxjs';
import { FakeData } from './fake-data';
import { Question } from './models/question';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowApiService {

  constructor(private http: HttpClient) { }

  getLatestQuestions() {
    if (environment.production) {
      return this.http.get<any>('https://api.stackexchange.com/2.2/questions?page=1&pagesize=10&fromdate=1576281600&todate=1576800000&order=desc&sort=creation&tagged=android&site=stackoverflow')
        .pipe(map<any, Question[]>(response => response.items));
    }else {
      return of(FakeData.newestQuestions as Question[]);
    }
  }
}
