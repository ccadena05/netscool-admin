import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DemoComponent,
    CreateComponent,
    DetailComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
