import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Question } from '../models/question';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

export class HttpStackOverflowDataSource implements StackOverflowDataSource {
    apiRoot = 'https://api.stackexchange.com/2.2/';
    apiKey: string = environment.stackAppsApiKey;

    constructor(private http: HttpClient) {
    }

    private getQuestionList(sortBy: string) {
        let oneWeekAgo = moment().add(-7, "days").unix();
        return this.http.get<any>(`${this.apiRoot}questions/`, {
            params: {
                page: '1',
                pageSize: '10',
                fromdate: oneWeekAgo + '',
                order: 'desc',
                sort: sortBy,
                tagged: 'android',
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, Question[]>(response => {
            return response.items;
        }));
    }

    getLatestQuestions(): Observable<any[]> {
        return this.getQuestionList('creation');
    }

    getMostVotedQuestions() {
        return this.getQuestionList('votes');
    }

    getQuestion(id: number) {
        return this.http.get<any>(`${this.apiRoot}questions/${id}`, {
            params: {
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, Question>(response => response.items[0]));
    }

    getAnswers(questionId: number) {
        return this.http.get<any>(`${this.apiRoot}questions/${questionId}/answers`, {
            params: {
                order: 'desc',
                sort: 'votes',
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, any[]>(response => response.items));
    }
}
