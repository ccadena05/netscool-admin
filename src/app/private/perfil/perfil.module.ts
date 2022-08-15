import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [  
    ComponentsModule,
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
