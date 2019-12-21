import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';

export interface StackOverflowDataSource {
    getLatestQuestions(): Observable<Question[]>;
    getMostVotedQuestions(): Observable<Question[]>;
    getQuestion(id: number): Observable<Question>;
    getAnswers(questionId: number): Observable<Answer[]>;
    getComments(postIds: number[]): Observable<Comment[]>;
}
