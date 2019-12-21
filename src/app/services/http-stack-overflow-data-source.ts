import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Question } from '../models/question';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class HttpStackOverflowDataSource implements StackOverflowDataSource {
    apiRoot = 'https://api.stackexchange.com/2.2/';
    apiKey: string = environment.stackAppsApiKey;

    constructor(private http: HttpClient) {
    }

    getLatestQuestions(): Observable<any[]> {
        return this.http.get<any>(`${this.apiRoot}questions/`, {
            params: {
                page: '1',
                pageSize: '10',
                fromdate: '1576281600', // todo: make dynamic
                order: 'desc',
                sort: 'creation',
                tagged: 'android',
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, Question[]>(response => {
            return response.items;
        }));
    }

    getQuestionThread(id: number): Observable<any> {
        return forkJoin([this.getQuestion(id), this.getAnswers(id)]).pipe(map(results => {
            let question = results[0];
            question.answers = results[1];
            return question;
        }))
    }

    private getQuestion(id: number) {
        return this.http.get<any>(`${this.apiRoot}questions/${id}`, {
            params: {
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, Question>(response => response.items[0]));
    }

    private getAnswers(questionId: number) {
        return this.http.get<any>(`${this.apiRoot}questions/${questionId}/answers`, {
            params: {
                order: 'desc',
                sort: 'activity',
                site: 'stackoverflow',
                filter: 'withbody',
                key: this.apiKey
            }
        }).pipe(map<any, any[]>(response => response.items));
    }
}
