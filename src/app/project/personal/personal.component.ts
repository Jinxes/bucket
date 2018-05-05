import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public viewer: String = 'profile';

  constructor(
    public userService: UserService,
    public modalService: ModalService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.userService.isNotLogin()) {
      this.router.navigateByUrl('/signin');
    }
  }

  public tab(viewer: string) {
    this.viewer = viewer;
  }

  public showUserCard() {
    this.modalService.alert('sunc');
  }

}
