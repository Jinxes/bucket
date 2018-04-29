import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  public _systemError = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [
        Validators.required, Validators.minLength(4), Validators.email
      ]],
      password: ['', [
        Validators.required, Validators.minLength(6), Validators.maxLength(16)
      ]]
    });
  }

  private setSystemError(message: String) {
    this._systemError = message;
  }

  public onSubmit() {
    this._systemError = false;
    if (this.signinForm.valid) {
      const response = this.userService.signin(this.signinForm.value);
      response.subscribe((data) => {
        if (data.status === this.apiService.SUCCESS) {
          this.userService.authorization(data.body.token);
          this.router.navigateByUrl('/');
        }
      }, (error) => {
        if (error.status === 0) {
          this.setSystemError('系统繁忙，请稍后再试');
        } else {
          const errors = error.error.errors;
          for (const key of Object.keys(errors)) {
            if (key !== '_system') {
              this.signinForm.controls[key].setErrors({
                async: errors[key][0]
              });
            } else {
              this.setSystemError(errors._system);
            }
          }
        }
      });
    }
  }

}
