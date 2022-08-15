import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentoresRoutingModule } from './mentores-routing.module';
import { MentoresComponent } from './mentores.component';


@NgModule({
  declarations: [
    MentoresComponent
  ],
  imports: [
    CommonModule,
    MentoresRoutingModule
  ]
})
export class MentoresModule { }
