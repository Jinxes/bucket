import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
