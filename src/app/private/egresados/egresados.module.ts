import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';

import { EgresadosRoutingModule } from './egresados-routing.module';
import { EgresadosComponent } from './egresados.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/components/material/material.module';


@NgModule({
  declarations: [
    EgresadosComponent,

  ],
  imports: [
    CommonModule,
    EgresadosRoutingModule,
    ComponentsModule,
    MaterialModule,
  ],
  providers: [
   KeyValuePipe
  ]
})
export class EgresadosModule { }
