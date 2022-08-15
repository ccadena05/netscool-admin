import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunidadesRoutingModule } from './oportunidades-routing.module';
import { OportunidadesComponent } from './oportunidades.component';


@NgModule({
  declarations: [
    OportunidadesComponent
  ],
  imports: [
    CommonModule,
    OportunidadesRoutingModule
  ]
})
export class OportunidadesModule { }
