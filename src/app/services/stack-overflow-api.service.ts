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
import { forkJoin, observable } from 'rxjs';
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
      return this.dataSource.getComments(ids)
        .pipe(map(comments => this.processQuestion(question, comments)));
    })).pipe(map(this.findObsolete));

    return questionObs;
  }

  processQuestion(question: Question, allComments: Comment[]) {
    this.processPost(question, allComments, "question_id");
    question.answers.forEach(answer => this.processPost(answer, allComments, "answer_id"));
    return question;
  }

  private processPost(post: Post, allComments?: Comment[], idProp?: string) {
    let formatDate = (unix: number) => moment.unix(unix).format('MMM D, YY');
    let formatAgo =  (unix: number) => moment.unix(unix).fromNow();

    post.lastActivityDateLabel = formatAgo(post.last_activity_date);
    post.creationDateLabel = formatDate(post.creation_date);
    if (post.last_edit_date) {
      post.lastEditDateLabel = formatDate(post.last_edit_date);
    }

    if (allComments && idProp) {
      post.comments = _.filter(allComments, c => c.post_id === post[idProp]);
      post.comments.forEach(comment => comment.creationDateLabel = formatDate(comment.creation_date));
    }

    return post;
  }

  private findObsolete(question: Question) {
    const obsoleteKeyWord = "obsolete";
    question.isAboutObsolete = question.title.includes(obsoleteKeyWord) || question.body.includes(obsoleteKeyWord);
    question.isAboutObsolete = question.isAboutObsolete || _.some(question.answers, a => a.body.includes(obsoleteKeyWord));
    if (question.isAboutObsolete)
      return question;

    question.answers.forEach(answer => {
      answer.comments.forEach(comment => {
        if (comment.creation_date < answer.last_edit_date)
          return;

        comment.makesObsolete = comment.body.includes(obsoleteKeyWord);
        answer.isObsolete = answer.isObsolete || comment.makesObsolete;
        question.hasObsoleteAnswer = question.hasObsoleteAnswer || answer.isObsolete;
        if (answer.isObsolete && answer.is_accepted) {
          question.isAcceptedAnswerObsolete = true;
        }
      });
    });

    console.log(question.hasObsoleteAnswer, question.isAcceptedAnswerObsolete, question.isAboutObsolete);
    return question;
  }
}
