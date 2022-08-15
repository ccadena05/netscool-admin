import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterclassRoutingModule } from './masterclass-routing.module';
import { MasterclassComponent } from './masterclass.component';


@NgModule({
  declarations: [
    MasterclassComponent
  ],
  imports: [
    CommonModule,
    MasterclassRoutingModule
  ]
})
export class MasterclassModule { }
