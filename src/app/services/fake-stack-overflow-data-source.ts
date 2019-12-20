import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Observable, of } from 'rxjs';
import { Question } from '../models/question';
import { FakeData } from './fake-data';
import * as _ from 'lodash';

export class FakeStackOverflowDataSource implements StackOverflowDataSource {
    getLatestQuestions(): Observable<Question[]> {
        return of(_.cloneDeep(FakeData.newestQuestions));
    }

    getQuestionThread(id: number): Observable<Question> {
        let question = _.cloneDeep(FakeData.newestQuestions.find(q => q.question_id === id));
        question.answers = FakeData.answersOfAQuestions;
        return of(question);
    }
}
