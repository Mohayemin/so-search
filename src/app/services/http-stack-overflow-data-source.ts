import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class HttpStackOverflowDataSource implements StackOverflowDataSource {
    apiRoot = 'https://api.stackexchange.com/2.2/';

    constructor(private http: HttpClient) {
    }

    getLatestQuestions(): Observable<Question[]> {
        return this.http.get<any>(`${this.apiRoot}questions/`, {
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
    }

    getQuestionThread(id: number): Observable<Question> {
        throw new Error("Method not implemented.");
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
