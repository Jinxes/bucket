import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public viewer: String = 'talk';

  constructor() { }

  ngOnInit() {
  }

  public tab(viewer: string) {
    this.viewer = viewer;
  }

}
