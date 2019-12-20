import { Observable } from 'rxjs';
import { Question } from '../models/question';

export interface StackOverflowDataSource {
    getLatestQuestions(): Observable<any[]>;
    getQuestionThread(id: number): Observable<Question>;
}
