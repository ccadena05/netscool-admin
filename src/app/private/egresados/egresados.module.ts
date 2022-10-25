import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';

import { EgresadosRoutingModule } from './egresados-routing.module';
import { EgresadosComponent } from './egresados.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';


@NgModule({
  declarations: [
    EgresadosComponent,
  ],
  imports: [
    CommonModule,
    EgresadosRoutingModule,
    ComponentsModule,
    MaterialModule,
    MatTableModule
  ],
  providers: [
   KeyValuePipe
  ]
})
export class EgresadosModule { }
