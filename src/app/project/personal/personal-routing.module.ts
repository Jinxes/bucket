import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: 'personal/blog', component: BlogComponent, outlet: 'personal' },
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class PersonalRoutingModule { }
