import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Observable, of } from 'rxjs';
import { Question } from '../models/question';
import { FakeData } from './fake-data';

export class FakeStackOverflowDataSource implements StackOverflowDataSource {
    getLatestQuestions(): Observable<Question[]> {
        return of(FakeData.newestQuestions);
    }

    getQuestionThread(id: number): Observable<Question> {
        let question = FakeData.newestQuestions.find(q => q.question_id === id);
        question.answers = FakeData.answersOfAQuestions;
        return of(question);
    }

}
