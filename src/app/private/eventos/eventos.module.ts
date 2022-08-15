import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos.component';
import { DialogComponent } from './dialog/dialog.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    EventosComponent,
    DialogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule
  ]
})
export class EventosModule { }
