import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ng2-cookies';
import { UtilService } from './util.service';

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
  public MIME_XML = 'application/xml';
  public MIME_HTML = 'text/html';
  public MIME_XHTML = 'application/xhtml+xml';
  public MIME_TEXT = 'text/plain';
  public MIME_PDF = 'application/pdf';
  public MIME_EXCEL = 'application/vnd.ms-excel';
  public MIME_CSV = 'text/csv';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': this.MIME_JSON,
      'Authorization': this.utilService.getToken(),
    }),
    reportProgress: true,
    withCredentials: true,
  };

  constructor(
    public http: HttpClient,
    public cookieService: CookieService,
    public utilService: UtilService
  ) { }

  public get(url: string): Observable<HttpResponse<any>> {
    this.httpOptions['observe'] = 'response';
    return this.http.get<any>(
      url, this.httpOptions
    );
  }

  public post(url: string, data: object): Observable<HttpResponse<any>> {
    this.httpOptions['observe'] = 'response';
    return this.http.post<any>(
      url, data, this.httpOptions
    );
  }

}
