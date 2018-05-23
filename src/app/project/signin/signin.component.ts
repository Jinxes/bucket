import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormComponentBase } from '../form-component.base';
import { UserService } from '../../service/user.service';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends FormComponentBase implements OnInit {

  public signinForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public apiService: ApiService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [
        Validators.required, Validators.minLength(4), Validators.email
      ]],
      password: ['', [
        Validators.required, Validators.minLength(6), Validators.maxLength(16)
      ]]
    });
    this.formGroupRegister(this.signinForm);
  }

  public onSubmit() {
    if (this.isValid()) {
      const response = this.userService.signin(this.signinForm.value);
      response.subscribe((data) => {
        if (data.status === this.apiService.SUCCESS) {
          this.userService.authorization(data.body.token);
          this.router.navigateByUrl('/');
        }
      }, this.formInvalidHandle());
    }
  }

}
