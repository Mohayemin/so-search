import { Observable } from 'rxjs';

export interface StackOverflowDataSource {
    getLatestQuestions(): Observable<any[]>;
    getQuestionThread(id: number): Observable<any>;
}
