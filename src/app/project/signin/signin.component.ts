import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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

  public onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.userService.userSignin(this.signinForm.value));
    }
  }

}
