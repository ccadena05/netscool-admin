import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcosistemaRoutingModule } from './ecosistema-routing.module';
import { EcosistemaComponent } from './ecosistema.component';


@NgModule({
  declarations: [
    EcosistemaComponent
  ],
  imports: [
    CommonModule,
    EcosistemaRoutingModule
  ]
})
export class EcosistemaModule { }
