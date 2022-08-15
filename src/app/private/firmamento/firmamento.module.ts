import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirmamentoRoutingModule } from './firmamento-routing.module';
import { FirmamentoComponent } from './firmamento.component';


@NgModule({
  declarations: [
    FirmamentoComponent
  ],
  imports: [
    CommonModule,
    FirmamentoRoutingModule
  ]
})
export class FirmamentoModule { }
