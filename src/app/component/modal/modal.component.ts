import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.modal.hide();
  }

}
