import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './project/header/header.component';
import { SigninComponent } from './project/signin/signin.component';
import { FooterComponent } from './project/footer/footer.component';
import { UserService } from './service/user.service';
import { CookieService } from 'ng2-cookies';
import { ApiService } from './service/api.service';
import { UtilService } from './service/util.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    FooterComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CookieService,
    ApiService,
    UtilService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
