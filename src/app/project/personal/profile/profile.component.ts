import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from '../../form-component.base';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends FormComponentBase implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onSubmit() {
  }

}
