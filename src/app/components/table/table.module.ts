import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MaterialModule } from '../material/material.module';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableExporterModule,
  ]
})
export class TableModule { }
