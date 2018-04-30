import { Component, OnInit } from '@angular/core';
import { SearchStruct } from '../../structs/header/search.struct';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public model: SearchStruct = {keyword: ''};

  public submitted = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
