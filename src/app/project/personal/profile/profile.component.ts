import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { FormComponentBase } from '../../form-component.base';
import { UserService } from '../../../service/user.service';
import { UserData } from '../../../structs/user.struct';
import { ModalService } from '../../../service/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends FormComponentBase implements OnInit {

  public profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public modalService: ModalService
  ) {
    super();
  }

  ngOnInit() {
    this.formBuild();
    const response = this.userService.userData();
    response.subscribe((resp) => {
      const { birthday } = resp.body;
      console.log(resp.body);
      const birthObject = birthday.split('-');
      resp.body.birthday = {
        year: parseInt(birthObject[0], 10),
        month: parseInt(birthObject[1], 10),
        day: parseInt(birthObject[2], 10)
      };
      this.profileForm.setValue(resp.body);
    }, error => {
      console.log(error);
    });
  }

  public formBuild() {
    this.profileForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ], this.userService.emailRepTest()),
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
    const data = this.profileForm.value;
    data.birthday = data.birthday.year + '-' + data.birthday.month + '-' + data.birthday.day;
    const response = this.userService.updateData(data);
    response.subscribe((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        this.modalService.alert('保存成功！');
        setTimeout(() => {
          this.modalService.close();
        }, 1000);
      }
    }, this.formInvalidHandle());
  }

  /**
   * email 错误信息
   */
  public emailValidText(): string {
    if (this.profileForm.controls.email.errors) {
      const message = this.profileForm.controls.email.errors.emailRepTest;
      if (message) {
        return message;
      }
      const asyncMessage = this.profileForm.controls.email.errors.async;
      if (asyncMessage) {
        return asyncMessage;
      }
    }
    return '邮箱格式有误';
  }

}
