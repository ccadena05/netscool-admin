import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasDetailRoutingModule } from './materias-detail-routing.module';
import { MateriasDetailComponent } from './materias-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    MateriasDetailComponent
  ],
  imports: [
    CommonModule,
    MateriasDetailRoutingModule,
    MaterialModule,
    ComponentsModule,
    MatTableModule
  ]
})
export class MateriasDetailModule { }
