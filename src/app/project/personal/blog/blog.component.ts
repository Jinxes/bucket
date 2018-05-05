import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public blogs: Array<any>;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    const response = this.userService.getUserBlogs();
    response.subscribe((resp) => {
      console.log(resp);
      this.blogs = resp.body;
    });
  }

}
