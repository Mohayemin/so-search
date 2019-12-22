import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'ss-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() isAccepted: boolean;
  @Input() isObsolete: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
