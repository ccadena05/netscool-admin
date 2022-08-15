import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetosRoutingModule } from './retos-routing.module';
import { RetosComponent } from './retos.component';


@NgModule({
  declarations: [
    RetosComponent
  ],
  imports: [
    CommonModule,
    RetosRoutingModule
  ]
})
export class RetosModule { }
