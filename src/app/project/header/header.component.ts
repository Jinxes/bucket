import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public images = [
    'https://picsum.photos/900/500?image=923',
    'https://picsum.photos/900/500?image=931',
    'https://picsum.photos/900/500?image=1003'
  ];

  constructor() { }

  ngOnInit() {
  }

}
