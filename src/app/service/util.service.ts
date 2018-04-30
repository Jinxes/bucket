import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class UtilService {

  constructor(
    public cookieService: CookieService
  ) { }

  public getToken(): string {
    const token = localStorage.getItem('auth');
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
