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

    if (this.question.answer_count > 0) {
      if (this.question.is_answered) {
        this.setValues('Add an answer', 'secondary');
      } else {
        this.setValues('Add an acceptable answer', 'success');
      }
    } else {
      this.setValues('Be the first to answer', 'warning');
    }
  }

  private setValues(label: string, badgeType: string) {
    this.label = label;
    this.cssClass = `badge badge-${badgeType}`;
  }
}
