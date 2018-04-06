import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class UtilService {

  constructor(
    private cookieService: CookieService
  ) { }

  public getToken(): string {
    const token = this.cookieService.get('token');
    return token;
  }

  public empty(value: any): Boolean {
    if (
      value === '' ||
      value === null ||
      value === 0 ||
      value === false ||
      value === {} ||
      value === []
    ) {
      return true;
    }
    return false;
  }

}
