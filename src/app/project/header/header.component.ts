import { Component, OnInit } from '@angular/core';
import { SearchStruct } from '../../structs/header/search.struct';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public model: SearchStruct = {keyword: ''};

  public submitted = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  public signout() {
    this.userService.signout((data) => {
      this.router.navigateByUrl('/signin');
    });
  }

  public onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
