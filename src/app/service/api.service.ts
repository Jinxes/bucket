import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ng2-cookies';
import { UtilService } from './util.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  public SUCCESS = 200;
  public CREATED = 201;
  public ACCEPTED = 202;
  public NO_CONTENT = 204;
  public RESET_CONTENT = 205;
  public PARTIAL_CONTENT = 206;
  public MOVED_PERMANENTLY = 301;
  public MOVED_TEMPORARILY = 302;
  public SEE_OTHER = 303;
  public BAD_REQUEST = 400;
  public UNAUTHORIZED = 401;
  public FORBIDDEN = 403;
  public NOT_FOUND = 404;
  public METHOD_NOT_ALLOWED = 405;
  public NOT_ACCEPTABLE = 406;
  public GONE = 410;
  public LOCKED = 423;
  public INTERNAL_SERVER_ERROR = 500;
  public BAD_GATEWAY = 502;
  public SERVICE_UNAVAILABLE = 503;
  public VERSION_NOT_SUPPORTED = 505;
  public BANDWIDTH_LIMIT_EXCEEDED = 509;

  public MIME_JSON = 'application/json';
  public MIME_URL = 'application/x-www-form-urlencoded';
  public MIME_XML = 'application/xml';
  public MIME_HTML = 'text/html';
  public MIME_XHTML = 'application/xhtml+xml';
  public MIME_TEXT = 'text/plain';
  public MIME_PDF = 'application/pdf';
  public MIME_EXCEL = 'application/vnd.ms-excel';
  public MIME_CSV = 'text/csv';
  public baseUrl = 'http://localhost:4200/api/v1';

  constructor(
    public http: HttpClient,
    public cookieService: CookieService,
    public utilService: UtilService,
    public router: Router
  ) { }

  public getHttpOptions(): {headers: HttpHeaders} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': this.MIME_JSON,
        'Accept': this.MIME_JSON,
        'Authorization': 'Bearer ' + this.utilService.getToken(),
      }),
      reportProgress: true,
      withCredentials: true,
      observe: 'response'
    };
    return httpOptions;
  }

  public handleTap(response) {
    const token = response.headers.get('authorization');
    if (token) {
      this.authorization(token);
    }
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === this.UNAUTHORIZED) {
        this.router.navigateByUrl('/signin');
      }
      return of(result as T);
    };
  }

  public pipeWorker(observer: Observable<any>): Observable<any> {
    return observer.pipe(
      tap(this.handleTap.bind(this)),
      catchError(this.handleError(undefined, []))
    );
  }

  /**
   * 生成 GET 请求的 URL 参数后缀
   * @param data object
   * @return string
   */
  private makeUrlfix(data: object = {}): string {
    const body = new URLSearchParams();
    for (const key of Object.keys(data)) {
      body.set(key, data[key]);
    }
    return data !== {} ? '?' + body : '';
  }

  public get(url: string, data: object = {}): Observable<HttpResponse<any>> {
    const httpOptions = this.getHttpOptions();
    httpOptions.headers['Content-Type'] = this.MIME_URL;
    const fixedUrl = this.makeUrlfix(data);
    console.log(fixedUrl);
    return this.pipeWorker(
      this.http.get<any>(
        this.baseUrl + url + fixedUrl, httpOptions
      )
    );
  }

  public post(url: string, data: object = {}): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);
    return this.pipeWorker(
      this.http.post<any>(
        this.baseUrl + url, body, this.getHttpOptions()
      )
    );
  }

  public put(url: string, data: object): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);
    return this.pipeWorker(
      this.http.put<any>(
        this.baseUrl + url, body, this.getHttpOptions()
      )
    );
  }

  public delete(url: string, data: object = {}): Observable<HttpResponse<any>> {
    const httpOptions = this.getHttpOptions();
    httpOptions.headers['Content-Type'] = this.MIME_URL;
    const fixedUrl = this.makeUrlfix(data);
    return this.pipeWorker(
      this.http.delete<any>(
        this.baseUrl + url + fixedUrl, httpOptions
      )
    );
  }

  public head(url: string, data: object = {}): Observable<HttpResponse<any>> {
    const httpOptions = this.getHttpOptions();
    httpOptions.headers['Content-Type'] = this.MIME_URL;
    const fixedUrl = this.makeUrlfix(data);
    return this.pipeWorker(
      this.http.head<any>(
        this.baseUrl + url + fixedUrl, httpOptions
      )
    );
  }

  public authorization(token: string): void {
    localStorage.setItem('auth', token);
  }

}
