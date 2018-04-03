import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public images = {
    src: '/assets/image/signin/001.jpg',
    title: 'fragment.top'
  };

  constructor() { }

  ngOnInit() {
  }

}
