import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { FormComponentBase } from '../../form-component.base';
import { UserService } from '../../../service/user.service';
import { UserData } from '../../../structs/user.struct';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends FormComponentBase implements OnInit {

  public profileForm: FormGroup;

  constructor(
    public userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    const data: UserData = {
      nickname: 'asd',
      email: 'asd@as.ad',
      sign: 'asdasd',
      address: 'dadasdad',
      birthday: {
        year: 2018,
        month: 3,
        day: 4
      },
      gender: 1,
      intro: 'dasdaddasdasdasdsa'
    };
    this.formBuild(data);
    setTimeout(() => {
      this.profileForm.setValue(data);
    }, 1500);
  }

  public formBuild(data: UserData) {
    this.profileForm = new FormGroup({
      nickname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]),
      sign: new FormControl(null, [
        Validators.maxLength(32)
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64)
      ]),
      birthday: new FormControl(null, [
        Validators.required
      ]),
      gender: new FormControl(null, [
        Validators.required
      ]),
      intro: new FormControl(null, [
        Validators.maxLength(255)
      ]),
    });
    this.formGroupRegister(this.profileForm);
  }

  public genderChecked(val: Number): Boolean {
    if (this.profileForm.value.gender === val) {
      return true;
    }
    return false;
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

}
