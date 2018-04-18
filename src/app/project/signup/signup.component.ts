import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required, Validators.minLength(4), Validators.email
      ]],
      password: ['', [
        Validators.required, Validators.minLength(6), Validators.maxLength(16)
      ]]
    });
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.userService.userSignin(this.signupForm.value));
    }
  }

  public currentStep(s: Number) {
    if (s === this.step) {
      return 'royal-color';
    } else {
      return 'gainsboro-color';
    }
  }

}
