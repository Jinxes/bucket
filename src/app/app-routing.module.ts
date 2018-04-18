import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './project/signin/signin.component';
import { HeaderComponent } from './project/header/header.component';

const routes: Routes = [
  { path: 'signup', component: SigninComponent },
  { path: '**', component: HeaderComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
