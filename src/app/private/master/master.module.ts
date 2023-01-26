import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';
import { ProgramaAcademicoDetailComponent } from './programa-academico-detail/programa-academico-detail.component';
import { FechasInscripcionDetailComponent } from './fechas-inscripcion-detail/fechas-inscripcion-detail.component';


@NgModule({
  declarations: [
    MasterComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ComponentsModule,
    MaterialModule,
    MatTableModule
  ],
  providers: [
   KeyValuePipe
  ]
})
export class MasterModule { }
