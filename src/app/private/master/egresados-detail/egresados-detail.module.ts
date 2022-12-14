import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresadosDetailRoutingModule } from './egresados-detail-routing.module';
import { EgresadosDetailComponent } from './egresados-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
   EgresadosDetailComponent
  ],
  imports: [
    CommonModule,
    EgresadosDetailRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class EgresadosDetailModule { }
