import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'ss-answer-link',
  templateUrl: './answer-link.component.html',
  styleUrls: ['./answer-link.component.scss']
})
export class AnswerLinkComponent implements OnInit {
  @Input() question: Question;
  url: string;
  label: string;
  cssClass: string;

  constructor() { }

  ngOnInit() {
    this.url = this.question.link + '#post-editor';
    if (this.question.is_answered) {
      this.label = 'Add an answer';
      this.cssClass = 'badge badge-secondary';
    } else {
      this.label = 'Be the first to answer';
      this.cssClass = 'badge badge-warning';
    }
  }

}
