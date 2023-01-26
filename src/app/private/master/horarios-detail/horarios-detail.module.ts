import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosDetailRoutingModule } from './horarios-detail-routing.module';
import { HorariosDetailComponent } from './horarios-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatTableComponent } from 'src/app/components/mat-table/mat-table.component';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';
import { PeriodoComponent } from './periodo/periodo.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    HorariosDetailComponent,
    PeriodoComponent
  ],
  imports: [
    CommonModule,
    HorariosDetailRoutingModule,
    MaterialModule,
    MatTableModule,
    ComponentsModule
  ]
})
export class HorariosDetailModule { }
