import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blogbox',
  templateUrl: './blogbox.component.html',
  styleUrls: ['./blogbox.component.scss']
})
export class BlogboxComponent implements OnInit {

  @Input() blog: any;

  constructor() { }

  ngOnInit() {
    console.log(this.blog.title);
  }

}
