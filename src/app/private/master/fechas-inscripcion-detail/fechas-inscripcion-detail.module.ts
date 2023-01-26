import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FechasInscripcionDetailRoutingModule } from './fechas-inscripcion-detail-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FechasInscripcionDetailComponent } from './fechas-inscripcion-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
   declarations: [
      FechasInscripcionDetailComponent
   ],
   imports: [
      CommonModule,
      FechasInscripcionDetailRoutingModule,
      MaterialModule,
      ComponentsModule,
      MatTableModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      MatDatepickerModule
   ]
})
export class FechasInscripcionDetailModule { }
