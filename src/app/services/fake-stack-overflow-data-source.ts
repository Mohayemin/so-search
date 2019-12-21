import { StackOverflowDataSource } from './stack-overflow-data-source';
import { Observable, of } from 'rxjs';
import { FakeData } from './fake-data';
import * as _ from 'lodash';

export class FakeStackOverflowDataSource implements StackOverflowDataSource {
    getQuestion(id: number) {
        let question = _.cloneDeep(FakeData.newestQuestions.find(q => q.question_id === id));
        return of(question);
    }
    getAnswers(questionId: number) {
        let answers = _.cloneDeep(FakeData.answersOfAQuestions);
        return of(answers)
    }
    getMostVotedQuestions(): Observable<any[]> {
        return of([]);
    }
    getLatestQuestions(): Observable<any[]> {
        return of(_.cloneDeep(FakeData.newestQuestions));
    }
}
