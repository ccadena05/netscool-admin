import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosDetailRoutingModule } from './contactos-detail-routing.module';
import { ContactosDetailComponent } from './contactos-detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTableModule } from 'src/app/components/mat-table/mat-table.module';


@NgModule({
   declarations: [
      ContactosDetailComponent
   ],
   imports: [
      CommonModule,
      ContactosDetailRoutingModule,
      MaterialModule,
      ComponentsModule,
      MatTableModule
   ]
})
export class ContactosDetailModule { }
