import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosDetailRoutingModule } from './maestros-detail-routing.module';
import { MaestrosDetailComponent } from './maestros-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTableComponent } from 'src/app/components/mat-table/mat-table.component';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';


@NgModule({
  declarations: [
    MaestrosDetailComponent
  ],
  imports: [
    CommonModule,
    MaestrosDetailRoutingModule,
    MaterialModule,
    ComponentsModule,
    MatTableModule
  ]
})
export class MaestrosDetailModule { }
