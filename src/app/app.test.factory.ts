/**
 * import all components, services and models
 */
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from './service/user.service';
import { ApiService } from './service/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ng2-cookies';
import { UtilService } from './service/util.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SigninComponent } from './project/signin/signin.component';
import { HeaderComponent } from './project/header/header.component';
import { FooterComponent } from './project/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './project/not-found/not-found.component';
import { ModalComponent } from './component/modal/modal.component';
import {ModalService} from './service/modal.service';

export const configureTestingModules = {
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ModalComponent,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/'},
    UserService,
    ApiService,
    HttpClient,
    CookieService,
    UtilService,
    ModalService,
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
};
