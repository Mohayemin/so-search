import { Observable } from 'rxjs';

export interface StackOverflowDataSource {
    getLatestQuestions(): Observable<any[]>;
    getMostVotedQuestions(): Observable<any[]>;
    getQuestionThread(id: number): Observable<any>;
}
