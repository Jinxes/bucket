import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './project/signin/signin.component';
import { HeaderComponent } from './project/header/header.component';
import { NotFoundComponent } from './project/not-found/not-found.component';
import { SignupComponent } from './project/signup/signup.component';
import { PersonalComponent } from './project/personal/personal.component';
import { BlogComponent } from './project/personal/blog/blog.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'personal', children: [
    { path: 'blog', component: BlogComponent, outlet: 'blog' },
    { path: '', component: PersonalComponent }
  ] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
