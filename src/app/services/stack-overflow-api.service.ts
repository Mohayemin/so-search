import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StackOverflowDataSource } from './stack-overflow-data-source';
import { HttpStackOverflowDataSource } from './http-stack-overflow-data-source';
import { FakeStackOverflowDataSource } from './fake-stack-overflow-data-source';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Question } from '../models/question';
import { forkJoin } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowApiService {
  dataSource: StackOverflowDataSource;
  constructor(http: HttpClient) {
    this.dataSource = environment.useFakeData ?
      new FakeStackOverflowDataSource() :
      new HttpStackOverflowDataSource(http);
  }

  getQuestionList() {
    return forkJoin([this.dataSource.getLatestQuestions(), this.dataSource.getMostVotedQuestions()]).pipe(map(responses => {
      let all = _.unionBy(responses[0], responses[1], q => q.question_id);
      let questions = all.map(post => this.processPost(post)) as Question[];
      return questions;
    }));
  }

  getQuestionThread(id: number) {
    let questionObs = forkJoin([
      this.dataSource.getQuestion(id),
      this.dataSource.getAnswers(id)
    ]).pipe(map(results => {
      let question = results[0];
      question.answers = results[1];
      return question;
    })).pipe(mergeMap(question => {
      let ids = question.answers.map(a => a.answer_id).concat([question.question_id]);
      return this.dataSource.getComments(ids).pipe(map(comments => {
        this.processPost(question, comments, "question_id");
        question.answers.forEach(a => this.processAnswer(a, comments));
        return question;
      }));
    }));

    return questionObs;
  }

  private processPost(post: Post, allComments?: Comment[], idProp?: string) {
    post.creationDateLabel = moment.unix(post.creation_date).fromNow();
    post.lastActivityDateLabel = moment.unix(post.last_activity_date).fromNow();
    if (allComments && idProp)
      post.comments = _.filter(allComments, c => c.post_id === post[idProp])
    return post;
  }

  private processAnswer(answer: Answer, allComments: Comment[]) {
    this.processPost(answer, allComments, "answer_id");
    answer.comments.forEach(c => {
      c.hasObsoleteKeyword = c.body.indexOf("obsolete") > -1;
    });
  }
}
