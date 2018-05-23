import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { FormComponentBase } from '../form-component.base';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends FormComponentBase implements OnInit {

  public signupForm: FormGroup;

  static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordRe').value
      ? null : {'mismatch': true};
  }

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public modalService: ModalService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ], this.userService.emailTest()),
      username: new FormControl('', Validators.required),
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
    this.formGroupRegister(this.signupForm);
  }

  public onSubmit() {
    if (this.isValid()) {
      if (this.signupForm.valid) {
        const response = this.userService.signup(this.signupForm.value);
        response.subscribe((data) => {
          this.modalService.alert('注册成功！即将跳转登录页面。');
          setTimeout(() => {
            this.modalService.close();
            this.router.navigateByUrl('/signin');
          }, 2000);
        }, this.formInvalidHandle());
      }
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

  /**
   * email 错误信息
   */
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

  /**
   * 判断 passwordRe 与 password 是否相同
   */
  public passwordMismatch(): boolean {
    const control = this.signupForm.controls.passwordRe;
    const swap = control.dirty || control.touched;
    if (this.signupForm.errors) {
      if (swap && this.signupForm.errors.mismatch) {
        return true;
      }
    }
    return false;
  }

}
