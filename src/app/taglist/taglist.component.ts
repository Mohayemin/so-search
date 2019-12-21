import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ss-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.scss']
})
export class TaglistComponent implements OnInit {
  @Input() tags: string[];
  constructor() { }

  ngOnInit() {
  }

}
