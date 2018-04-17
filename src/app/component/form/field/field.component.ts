import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-com-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() type: string;
  @Input('htmlId') htmlId: string;
  @Input() name: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
