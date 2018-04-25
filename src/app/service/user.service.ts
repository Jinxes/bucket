import { SigninStruct, SignupStruct } from '../structs/user.struct';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { ApiService } from './api.service';
import { UtilService } from './util.service';

@Injectable()
export class UserService {

  public createUrl = '/api/user';
  public emailUrl = '/api/user/emailExist';
  public signinUrl = '/api/user/user';
  public signoutUrl = '/api/user/signout';
  public signupUrl = '/api/user/';

  public constructor(
    public http: HttpClient,
    public cookieService: CookieService,
    public apiService: ApiService,
    public utilService: UtilService
  ) { }

  public  signup(signupData: SignupStruct): Observable<HttpResponse<any>> {
    // this.apiService.httpOptions['observe'] = 'response';
    return this.apiService.post(this.signupUrl, signupData);
  }

  public signin(signinData: SigninStruct): Observable<HttpResponse<any>> {
    this.apiService.httpOptions['observe'] = 'response';
    return this.apiService.post(this.signinUrl, signinData);
  }

  public matchEmail(email: string): Observable<HttpResponse<any>> {
    this.apiService.httpOptions['observe'] = 'response';
    return this.apiService.get(this.emailUrl + '?email=' + email);
  }

  public signout(): void {
    this.apiService.httpOptions['observe'] = 'response';
    this.apiService.get(
      this.signoutUrl
    ).subscribe(data => {
      if (data.status === this.apiService.SUCCESS) {
        setTimeout(() => {
          window.location.reload(true);
        }, 500);
      }
    }, (error) => {
      if (error.status === 422) {
        alert(error.error.mess);
      }
      window.location.reload(true);
    });
  }

  public isLogin(): Boolean {
    const token = this.cookieService.get('token');
    return !this.utilService.empty(token);
  }

}
