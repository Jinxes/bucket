import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { AsyncValidatorFn } from '@angular/forms';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ], this.userService.emailTest()),
      nickname: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      passwordRe: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      gender: new FormControl(2, [
        Validators.required
      ])
    }, this.passwordMatchValidator);
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordRe').value
      ? null : {'mismatch': true};
  }

  public onSubmit() {
    if (this.signupForm.invalid) {
      alert('您输入的信息有错误，请检查');
      return false;
    }
    const response = this.userService.signup(this.signupForm.value);
    response.subscribe((data) => {
      window.location.href = '/signin';
    });
  }

  public emailValidText(): string {
    if (this.signupForm.controls.email.errors) {
      const message = this.signupForm.controls.email.errors.emailTest;
      if (message) {
        return message;
      }
    }
    return '邮箱格式有误';
  }

}
