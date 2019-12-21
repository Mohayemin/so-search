import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Observable, of } from 'rxjs';
import { FakeData } from './fake-data';
import * as _ from 'lodash';

export class FakeStackOverflowDataSource implements StackOverflowDataSource {
    getMostVotedQuestions(): Observable<any[]> {
        return of([]);
    }
    getLatestQuestions(): Observable<any[]> {
        return of(_.cloneDeep(FakeData.newestQuestions));
    }

    getQuestionThread(id: number): Observable<any> {
        let question = _.cloneDeep(FakeData.newestQuestions.find(q => q.question_id === id));
        question.answers = FakeData.answersOfAQuestions;
        return of(question);
    }
}
