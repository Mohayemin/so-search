import { Observable } from 'rxjs';
import { Question } from '../models/question';

export interface StackOverflowDataSource {
    getLatestQuestions(): Observable<Question[]>;
    getQuestionThread(id: number): Observable<Question>;
}
