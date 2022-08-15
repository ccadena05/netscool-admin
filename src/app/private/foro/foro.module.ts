import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { ForoComponent } from './foro.component';


@NgModule({
  declarations: [
    ForoComponent
  ],
  imports: [
    CommonModule,
    ForoRoutingModule
  ]
})
export class ForoModule { }
