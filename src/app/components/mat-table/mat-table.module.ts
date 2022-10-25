import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableComponent } from './mat-table.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
     MatTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  providers:[
   KeyValuePipe
  ],
  exports: [
   MatTableComponent
  ]
})
export class MatTableModule { }
