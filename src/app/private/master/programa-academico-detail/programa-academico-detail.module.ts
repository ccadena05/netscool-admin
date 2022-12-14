import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaAcademicoDetailRoutingModule } from './programa-academico-detail-routing.module';
import { ProgramaAcademicoDetailComponent } from './programa-academico-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
   declarations: [
      ProgramaAcademicoDetailComponent
   ],
   imports: [
      CommonModule,
      ProgramaAcademicoDetailRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      ComponentsModule
   ],
   providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
   ],
})
export class ProgramaAcademicoDetailModule { }
