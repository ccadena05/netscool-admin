import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConectalentoRoutingModule } from './conectalento-routing.module';
import { ConectalentoComponent } from './conectalento.component';


@NgModule({
  declarations: [
    ConectalentoComponent
  ],
  imports: [
    CommonModule,
    ConectalentoRoutingModule
  ]
})
export class ConectalentoModule { }
