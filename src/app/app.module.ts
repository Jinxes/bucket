import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
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
import { NotFoundComponent } from './project/not-found/not-found.component';
import { SignupComponent } from './project/signup/signup.component';
import { ModalComponent } from './component/modal/modal.component';
import { ModalService } from './service/modal.service';
import { PersonalComponent } from './project/personal/personal.component';
import { BlogComponent } from './project/personal/blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    FooterComponent,
    NotFoundComponent,
    SignupComponent,
    ModalComponent,
    PersonalComponent,
    BlogComponent,
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
    UtilService,
    ModalService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
