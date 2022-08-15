import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActoresRoutingModule } from './actores-routing.module';
import { ActoresComponent } from './actores.component';


@NgModule({
  declarations: [
    ActoresComponent
  ],
  imports: [
    CommonModule,
    ActoresRoutingModule
  ]
})
export class ActoresModule { }
