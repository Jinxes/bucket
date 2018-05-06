import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from '../form-component.base';
import { UserService } from '../../service/user.service';
import { ModalService } from '../../service/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-editer,[Markdown]',
  templateUrl: './blog-editer.component.html',
  styleUrls: ['./blog-editer.component.css']
})
export class BlogEditerComponent extends FormComponentBase implements OnInit {

  public blogForm: FormGroup;

  public preview: Boolean = false;

  constructor(
    public userService: UserService,
    public modalService: ModalService
  ) {
    super();
  }

  ngOnInit() {
    this.blogForm = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.maxLength(40960)
      ]),
    });
    this.formGroupRegister(this.blogForm);
  }

  onSubmit() {
    console.log(this.blogForm.value);
  }

}
