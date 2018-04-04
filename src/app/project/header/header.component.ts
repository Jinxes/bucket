import { Component, OnInit } from '@angular/core';
import { SearchStruct } from '../../structs/header/search.struct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public model: SearchStruct = {keyword: ''};

  public submitted = false;

  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
