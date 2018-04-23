import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  public step: Number = 1;

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
      ]),
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
      console.log(this.signupForm);
      alert('您输入的信息有错误，请检查');
    }
    console.log(this.signupForm);
  }

  public toStepOne() {
    this.step = 1;
  }

  public toStepTwo() {
    this.step = 2;
  }

  public toStepThree() {
    this.step = 3;
  }

  public currentStep(step: Number) {
    if (step === this.step) {
      return 'royal-color';
    } else {
      return 'gainsboro-color';
    }
  }

  public isHidden(num: Number): Boolean {
    return (num !== this.step);
  }

}
