import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordRe').value
      ? null : {'mismatch': true};
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router
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
    }, SignupComponent.passwordMatchValidator);
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      const response = this.userService.signup(this.signupForm.value);
      response.subscribe((data) => {
        this.modalService.alert('注册成功！即将跳转登录页面。');
        setTimeout(() => {
          this.modalService.close();
          this.router.navigateByUrl('/signin');
        }, 2000);
      }, (error) => {
        const errors = error.error.errors;
        for (const key of Object.keys(errors)) {
          this.signupForm.controls[key].setErrors({
            async: errors[key][0]
          });
        }
      });
    }
  }

  public validText(key: string, defaultMess: string): string {
    const errors = this.signupForm.controls[key].errors;
    if (errors && errors.async) {
      const asyncMessage = errors.async;
      return asyncMessage;
    }
    return defaultMess;
  }

  public emailValidText(): string {
    if (this.signupForm.controls.email.errors) {
      const message = this.signupForm.controls.email.errors.emailTest;
      if (message) {
        return message;
      }
      const asyncMessage = this.signupForm.controls.email.errors.async;
      if (asyncMessage) {
        return asyncMessage;
      }
    }
    return '邮箱格式有误';
  }

}
