import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  public display: String = 'none';
  public message: String = '';

  constructor() { }

  public show() {
    this.display = 'block';
  }

  public hide() {
    this.display = 'none';
  }

  public alert(message: string) {
    this.message = message;
    this.show();
  }

  public close() {
    this.hide();
  }

}
