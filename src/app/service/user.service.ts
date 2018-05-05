import { SigninStruct, SignupStruct, UserData } from '../structs/user.struct';
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
import { ModalService } from '../service/modal.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

@Injectable()
export class UserService {

  public emailUrl = '/api/user/email';
  public signinUrl = '/api/user/token';
  public signoutUrl = '/api/session';
  public signupUrl = '/api/user';
  public userDataUrl = '/api/user/data';
  public updateUrl = '/api/user/data';
  public repEmailUrl = '/api/user/rep-email';

  public blogListUrl = '/api/blog';

  public emailTest(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Promise((resolve, reject) => {
        const subscribeAble = this.matchEmail(control.value);
        subscribeAble.subscribe(data => {
          const message = '这个电子邮件已经被注册了';
          control.setErrors({
            emailTest: message
          });
          reject(message);
        }, error => {
          resolve({});
        });
      });
    };
  }

  public emailRepTest(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Promise((resolve, reject) => {
        const subscribeAble = this.matchRepEmail(control.value);
        subscribeAble.subscribe(data => {
          const message = '这个电子邮件已经被注册了';
          control.setErrors({
            emailRepTest: message
          });
          reject(message);
        }, error => {
          resolve({});
        });
      });
    };
  }

  public constructor(
    public http: HttpClient,
    public cookieService: CookieService,
    public apiService: ApiService,
    public utilService: UtilService,
    public modalService: ModalService
  ) { }

  public signup(signupData: SignupStruct): Observable<HttpResponse<any>> {
    return this.apiService.post(this.signupUrl, signupData);
  }

  public signin(signinData: SigninStruct): Observable<HttpResponse<any>> {
    return this.apiService.post(this.signinUrl, signinData);
  }

  public userData(): Observable<HttpResponse<UserData>> {
    return this.apiService.get(this.userDataUrl);
  }

  public updateData(data: UserData): Observable<HttpResponse<any>> {
    return this.apiService.put(this.updateUrl, data);
  }

  public matchEmail(email: string): Observable<HttpResponse<any>> {
    return this.apiService.get(this.emailUrl + '?email=' + email);
  }

  public matchRepEmail(email: string): Observable<HttpResponse<any>> {
    return this.apiService.get(this.repEmailUrl + '?email=' + email);
  }

  public authorization(token: string): void {
    localStorage.setItem('auth', token);
  }

  public clearAuth(): void {
    localStorage.clear();
  }

  public signout(callback: Function): void {
    this.apiService.delete(
      this.signoutUrl
    ).subscribe(data => {
      if (data.status === this.apiService.RESET_CONTENT) {
        this.clearAuth();
        this.modalService.alert('注销成功！');
        callback(data);
      }
    }, (error) => {
      this.clearAuth();
    });
    this.clearAuth();
  }

  public isLogin(): Boolean {
    const token = this.utilService.getToken();
    if (token !== null) {
      return true;
    }
    return false;
  }

  public isNotLogin(): Boolean {
    return ! this.isLogin();
  }

  public getUserBlogs(): Observable<HttpResponse<any>> {
    return this.apiService.get(this.blogListUrl);
  }

}
